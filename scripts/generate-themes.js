#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const TOKENS_DIR = join(ROOT_DIR, 'tokens');
const THEMES_DIR = join(ROOT_DIR, 'themes');
const COLORS_FILE = join(ROOT_DIR, 'originals', 'colors.ts');

const THEMES_CONFIG = [
  { name: 'Dark.Glass', file: 'Dark.Glass.tokens.json' },
  { name: 'Light.Glass', file: 'Light.Glass.tokens.json' },
  { name: 'Dark.Solid', file: 'Dark.tokens.json' },
  { name: 'Light.Solid', file: 'Light.tokens.json' }
];

function parseColorsFromTS() {
  if (!existsSync(COLORS_FILE)) {
    throw new Error(`Colors file not found: ${COLORS_FILE}`);
  }

  const colorsFileContent = readFileSync(COLORS_FILE, 'utf-8');
  const colorsMatch = colorsFileContent.match(/export const colors = ({[\s\S]*?}) as const;/);
  
  if (!colorsMatch) {
    throw new Error('Could not parse colors.ts - invalid format');
  }

  const colorsObjString = colorsMatch[1];
  const colors = {};
  const regex = /'([^']+)':\s*'([^']+)'/g;
  let match;
  
  while ((match = regex.exec(colorsObjString)) !== null) {
    colors[match[1]] = match[2];
  }

  return colors;
}

function extractColorProperties(tokens, colors, path = '', result = {}) {
  for (const [key, value] of Object.entries(tokens)) {
    if (key === '$type' || key === '$value' || key === '$extensions') {
      continue;
    }

    const currentPath = path ? `${path}.${key}` : key;

    if (value && typeof value === 'object') {
      if (value.$type === 'color' && value.$value) {
        const colorProperty = extractColorProperty(value.$value, colors);
        if (colorProperty) {
          result[currentPath] = colorProperty;
        }
      } else {
        extractColorProperties(value, colors, currentPath, result);
      }
    }
  }

  return result;
}

function extractColorProperty(value, colors) {
  let colorKey = null;
  let opacity = 1;

  if (typeof value === 'string' && value.startsWith('{')) {
    const ref = value.slice(1, -1);
    colorKey = ref.replace(/\./g, '-');
  } else if (typeof value === 'object' && value.hex) {
    const hexValue = value.hex.startsWith('#') ? value.hex : `#${value.hex}`;
    colorKey = Object.keys(colors).find((k) => colors[k] === hexValue);
    
    if (value.alpha !== undefined) {
      opacity = value.alpha;
    }

    if (colorKey) {
      return { colorKey, opacity };
    }
    return { hex: hexValue, opacity: value.alpha ?? 1 };
  }

  if (colorKey && colors[colorKey]) {
    return { colorKey, opacity };
  }

  return null;
}

function generateThemeContent(colors, colorProperties) {
  const baseColorsEntries = Object.entries(colors)
    .map(([key, hex]) => {
      const normalizedKey = key.replace(/-/g, '.');
      const prop = colorProperties[normalizedKey];
      const opacity = prop?.opacity ?? 1;
      return `  '${normalizedKey}': hexToRgba(colors['${key}'], ${opacity}),`;
    })
    .join('\n');

  const additionalProperties = Object.entries(colorProperties)
    .filter(([key]) => !Object.keys(colors).some((c) => c.replace(/-/g, '.') === key))
    .map(([key, prop]) => {
      if (prop.colorKey && colors[prop.colorKey]) {
        return `  '${key}': hexToRgba(colors['${prop.colorKey}'], ${prop.opacity}),`;
      }
      if (prop.hex) {
        const hexValue = prop.hex.startsWith('#') ? prop.hex : `#${prop.hex}`;
        const hexKey = Object.keys(colors).find((k) => colors[k] === hexValue);
        if (hexKey) {
          return `  '${key}': hexToRgba(colors['${hexKey}'], ${prop.opacity}),`;
        }
        return `  '${key}': hexToRgba('${hexValue}', ${prop.opacity}),`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n');

  return `import { colors } from '../originals/colors.js';

function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
}

interface ThemeColors {
  [key: string]: string;
}

const theme: ThemeColors = {
${baseColorsEntries}
${additionalProperties ? `\n${additionalProperties}` : ''}
};

export default theme;
export type { ThemeColors };
`;
}

function generateThemeFile(themeName, tokensFile, colors) {
  const tokensPath = join(TOKENS_DIR, tokensFile);
  
  if (!existsSync(tokensPath)) {
    throw new Error(`Tokens file not found: ${tokensPath}`);
  }

  const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));
  const colorProperties = extractColorProperties(tokens, colors);
  const themeContent = generateThemeContent(colors, colorProperties);
  const outputPath = join(THEMES_DIR, `${themeName}.colors.ts`);

  writeFileSync(outputPath, themeContent);
  console.info(`✅ Generated ${themeName}.colors.ts`);
}

function generateAllThemes() {
  const colors = parseColorsFromTS();
  let successCount = 0;
  let errorCount = 0;

  THEMES_CONFIG.forEach(({ name, file }) => {
    try {
      generateThemeFile(name, file, colors);
      successCount++;
    } catch (error) {
      console.error(`❌ Error generating ${name}:`, error.message);
      errorCount++;
    }
  });

  console.info(`\n✅ ${successCount} theme files generated successfully`);
  
  if (errorCount > 0) {
    console.warn(`⚠️  ${errorCount} theme files failed to generate`);
    process.exit(1);
  }
}

generateAllThemes();
