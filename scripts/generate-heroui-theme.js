#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'theme', 'figma-theme-source.json');
const OUTPUT_CSS = join(ROOT, 'theme', 'heroui-theme.css');
const OUTPUT_COLORS = join(ROOT, 'theme', 'colors.ts');

const FIGMA_TO_HEROUI = {
  'accent/accent': 'accent',
  'accent/accent-hover': 'accent-hover',
  'accent/accent-foreground': 'accent-foreground',
  'accent/accent-soft': 'accent-soft',
  'accent/accent-soft-hover': 'accent-soft-hover',
  'accent/accent-soft-foreground': 'accent-soft-foreground',
  'background/background': 'background',
  'background/background-secondary': 'background-secondary',
  'background/background-tertiary': 'background-tertiary',
  border: 'border',
  'danger/danger': 'danger',
  'danger/danger-foreground': 'danger-foreground',
  'default/default': 'default',
  'default/default-hover': 'default-hover',
  'default/default-foreground': 'default-foreground',
  'field/background': 'field-background',
  'field/background-hover': 'field-hover',
  'field/background-focus': 'field-focus',
  'field/border': 'field-border',
  'field/foreground': 'field-foreground',
  'field/placeholder': 'field-placeholder',
  'focus-ring': 'focus',
  'foreground/foreground': 'foreground',
  'foreground/muted': 'muted',
  overlay: 'overlay',
  'foreground/overlay': 'overlay-foreground',
  segment: 'segment',
  'foreground/segment': 'segment-foreground',
  'separator/separator': 'separator',
  'separator/separator-secondary': 'scrollbar',
  'success/success': 'success',
  'success/success-foreground': 'success-foreground',
  'surface/surface': 'surface',
  'surface/surface-foreground': 'surface-foreground',
  'surface/surface-secondary': 'surface-secondary',
  'surface/surface-secondary-foreground': 'surface-secondary-foreground',
  'surface/surface-tertiary': 'surface-tertiary',
  'surface/surface-tertiary-foreground': 'surface-tertiary-foreground',
  'warning/warning': 'warning',
  'warning/warning-foreground': 'warning-foreground'
};

/** HeroUI-compatible tokens derived from theme primitives when Figma has no explicit value. */
const DERIVED_THEME_TOKENS = {
  'surface-hover':
    'color-mix(in oklab, var(--surface) 92%, var(--surface-foreground) 8%)',
  'background-inverse': 'var(--foreground)',
  'default-soft': 'color-mix(in oklab, var(--default) 50%, transparent)',
  'default-soft-foreground': 'var(--default-foreground)',
  'default-soft-hover': 'color-mix(in oklab, var(--default) 60%, transparent)',
  'accent-hover': 'color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 10%)',
  'accent-soft': 'color-mix(in oklab, var(--accent) 15%, transparent)',
  'accent-soft-foreground':
    'color-mix(in oklab, var(--accent) 70%, var(--foreground) 30%)',
  'accent-soft-hover': 'color-mix(in oklab, var(--accent) 20%, transparent)',
  'danger-soft': 'color-mix(in oklab, var(--danger) 15%, transparent)',
  'danger-soft-foreground':
    'color-mix(in oklab, var(--danger) 70%, var(--foreground) 40%)',
  'danger-soft-hover': 'color-mix(in oklab, var(--danger) 20%, transparent)',
  'warning-soft': 'color-mix(in oklab, var(--warning) 15%, transparent)',
  'warning-soft-foreground':
    'color-mix(in oklab, var(--warning) 80%, var(--foreground) 70%)',
  'warning-soft-hover': 'color-mix(in oklab, var(--warning) 20%, transparent)',
  'success-soft': 'color-mix(in oklab, var(--success) 15%, transparent)',
  'success-soft-foreground':
    'color-mix(in oklab, var(--success) 80%, var(--foreground) 60%)',
  'success-soft-hover': 'color-mix(in oklab, var(--success) 20%, transparent)',
  'separator-secondary':
    'color-mix(in oklab, var(--surface) 85%, var(--surface-foreground) 15%)',
  'separator-tertiary':
    'color-mix(in oklab, var(--surface) 81%, var(--surface-foreground) 19%)',
  'border-secondary':
    'color-mix(in oklab, var(--surface) 78%, var(--surface-foreground) 22%)',
  'border-tertiary':
    'color-mix(in oklab, var(--surface) 66%, var(--surface-foreground) 34%)',
  'field-hover':
    'color-mix(in oklab, var(--field-background, var(--default)) 90%, var(--field-foreground, var(--foreground)) 2%)',
  'field-focus': 'var(--field-background, var(--default))',
  'field-border-hover':
    'color-mix(in oklab, var(--field-border, var(--border)) 88%, var(--field-foreground, var(--foreground)) 10%)',
  'field-border-focus':
    'color-mix(in oklab, var(--field-border, var(--border)) 74%, var(--field-foreground, var(--foreground)) 22%)',
  'default-hover':
    'color-mix(in oklab, var(--default) 96%, var(--default-foreground) 4%)',
  'success-hover':
    'color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%)',
  'warning-hover':
    'color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%)',
  'danger-hover':
    'color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%)'
};

const GLASS_OVERRIDES = {
  'light-glass': {
    Light: {
      background: { hex: '#f3f8fc', alpha: 0.72 },
      'surface': { hex: '#ffffff', alpha: 0.55 },
      'surface-secondary': { hex: '#ecf1f8', alpha: 0.45 },
      'surface-tertiary': { hex: '#eaeaeb', alpha: 0.38 },
      overlay: { hex: '#ffffff', alpha: 0.65 },
      'field-background': { hex: '#ffffff', alpha: 0.42 },
      'field-hover': { hex: '#ffffff', alpha: 0.52 },
      'field-focus': { hex: '#ffffff', alpha: 0.58 },
      segment: { hex: '#ffffff', alpha: 0.5 },
      default: { hex: '#eff6ff', alpha: 0.45 },
      border: { hex: '#dedee0', alpha: 0.55 },
      separator: { hex: '#e4e4e7', alpha: 0.5 }
    }
  },
  'dark-glass': {
    Dark: {
      background: { hex: '#060607', alpha: 0.78 },
      'surface': { hex: '#18181b', alpha: 0.52 },
      'surface-secondary': { hex: '#232325', alpha: 0.44 },
      'surface-tertiary': { hex: '#262728', alpha: 0.38 },
      overlay: { hex: '#18181b', alpha: 0.62 },
      'field-background': { hex: '#18181b', alpha: 0.4 },
      'field-hover': { hex: '#1c1c1f', alpha: 0.48 },
      'field-focus': { hex: '#18181b', alpha: 0.55 },
      segment: { hex: '#46464c', alpha: 0.55 },
      default: { hex: '#27272a', alpha: 0.5 },
      border: { hex: '#28282c', alpha: 0.65 },
      separator: { hex: '#1a1a1d', alpha: 0.7 }
    }
  }
};

function parseHex(hex) {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function srgbToLinear(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function rgbToOklch(r, g, b) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  const L = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
  const bVal = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;

  const C = Math.sqrt(a * a + bVal * bVal);
  let H = (Math.atan2(bVal, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return {
    l: +(L * 100).toFixed(2),
    c: +C.toFixed(4),
    h: +H.toFixed(2)
  };
}

function colorToCss(value) {
  if (!value || typeof value !== 'object') return null;
  if (value.alpha === 0 && value.hex) return 'transparent';

  const { r, g, b } = parseHex(value.hex);
  const { l, c, h } = rgbToOklch(r, g, b);
  const alpha = value.alpha ?? 1;

  if (Number.isNaN(c) || c < 0.0001) {
    return alpha < 1 ? `oklch(${l}% 0 0 / ${alpha})` : `oklch(${l}% 0 0)`;
  }

  return alpha < 1
    ? `oklch(${l}% ${c} ${h} / ${alpha})`
    : `oklch(${l}% ${c} ${h})`;
}

/** --separator-tertiary → separatorTertiary */
function cssNameToCamel(cssName) {
  return cssName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function buildThemeVars(variables, mode, overrides = {}) {
  const byName = Object.fromEntries(variables.map((v) => [v.name, v]));
  const lines = [];
  const tokens = {};
  const resolvedNames = new Set();

  for (const [figmaName, cssName] of Object.entries(FIGMA_TO_HEROUI)) {
    const variable = byName[figmaName];
    if (!variable) continue;

    let raw = variable.valuesByMode[mode];
    if (overrides[cssName]) raw = overrides[cssName];

    if (variable.resolvedType === 'COLOR') {
      const css = colorToCss(raw);
      if (css) {
        lines.push(`  --${cssName}: ${css};`);
        tokens[cssNameToCamel(cssName)] = css;
        resolvedNames.add(cssName);
      }
    }
  }

  return { lines, tokens, resolvedNames };
}

function buildDerivedThemeVars(resolvedNames) {
  const lines = ['', '  /* Derived Colors (HeroUI-compatible) */'];
  const tokens = {};

  for (const [cssName, value] of Object.entries(DERIVED_THEME_TOKENS)) {
    if (resolvedNames.has(cssName)) continue;
    lines.push(`  --${cssName}: ${value};`);
    tokens[cssNameToCamel(cssName)] = value;
  }

  return {
    lines: lines.length > 2 ? lines : [],
    tokens
  };
}

function serializeTokensObject(tokens, indent = 2) {
  const pad = ' '.repeat(indent);
  const entries = Object.entries(tokens)
    .map(([key, value]) => `${pad}${key}: ${JSON.stringify(value)},`)
    .join('\n');
  return entries;
}

function generate() {
  const source = JSON.parse(readFileSync(SOURCE, 'utf8'));
  const { variables } = source;

  const fieldRadiusVar = variables.find((v) => v.name === 'field/radius');
  const fieldRadiusPx = fieldRadiusVar?.valuesByMode?.Light ?? 12;

  const sharedExtras = [
    '  /* Border Radius */',
    '  --radius: 0.5rem;',
    `  --field-radius: ${fieldRadiusPx / 16}rem;`,
    '',
    '  /* Font Family — load Inter in your app */',
    '  --font-sans: var(--font-inter, ui-sans-serif, system-ui, sans-serif);'
  ];

  const lightTheme = buildThemeVars(variables, 'Light');
  const darkTheme = buildThemeVars(variables, 'Dark');
  const lightGlassTheme = buildThemeVars(
    variables,
    'Light',
    GLASS_OVERRIDES['light-glass'].Light
  );
  const darkGlassTheme = buildThemeVars(
    variables,
    'Dark',
    GLASS_OVERRIDES['dark-glass'].Dark
  );

  const lightDerived = buildDerivedThemeVars(lightTheme.resolvedNames);
  const darkDerived = buildDerivedThemeVars(darkTheme.resolvedNames);
  const lightGlassDerived = buildDerivedThemeVars(lightGlassTheme.resolvedNames);
  const darkGlassDerived = buildDerivedThemeVars(darkGlassTheme.resolvedNames);

  const lightLines = [...lightTheme.lines, ...lightDerived.lines];
  const darkLines = [...darkTheme.lines, ...darkDerived.lines];
  const lightGlassLines = [...lightGlassTheme.lines, ...lightGlassDerived.lines];
  const darkGlassLines = [...darkGlassTheme.lines, ...darkGlassDerived.lines];

  const themeColors = {
    light: { ...lightTheme.tokens, ...lightDerived.tokens },
    dark: { ...darkTheme.tokens, ...darkDerived.tokens },
    'light-glass': { ...lightGlassTheme.tokens, ...lightGlassDerived.tokens },
    'dark-glass': { ...darkGlassTheme.tokens, ...darkGlassDerived.tokens }
  };

  const glassExtras = [
    '  /* Glass effect */',
    '  --glass-blur: 16px;',
    '  --glass-saturation: 1.35;'
  ];

  const css = `/*
 * HeroUI Theme Customization — VL Design System
 * Generated from Figma collection "02_Theme (HeroUI)"
 * Add this to your global.css after importing @heroui/styles
 * @see https://heroui.com/docs/react/getting-started/theming
 *
 * Regenerate: npm run generate-theme
 */

:root,
.light,
.default,
[data-theme="light"],
[data-theme="default"] {
  /* Theme Colors (Light Mode) */
${lightLines.join('\n')}

${sharedExtras.join('\n')}
}

.dark,
[data-theme="dark"] {
  color-scheme: dark;
  /* Theme Colors (Dark Mode) */
${darkLines.join('\n')}

${sharedExtras.join('\n')}
}

.light-glass,
[data-theme="light-glass"] {
  color-scheme: light;
  /* Theme Colors (Light Glass) */
${lightGlassLines.join('\n')}

${[...sharedExtras, ...glassExtras].join('\n')}
}

.dark-glass,
[data-theme="dark-glass"] {
  color-scheme: dark;
  /* Theme Colors (Dark Glass) */
${darkGlassLines.join('\n')}

${[...sharedExtras, ...glassExtras].join('\n')}
}
`;

  const colorsTs = `/*
 * Theme color tokens — VL Design System
 * Generated from Figma collection "02_Theme (HeroUI)"
 * Same values as heroui-theme.css (oklch / color-mix / var strings).
 *
 * Regenerate: pnpm generate-theme
 */

export const themeColors = {
  light: {
${serializeTokensObject(themeColors.light, 4)}
  },
  dark: {
${serializeTokensObject(themeColors.dark, 4)}
  },
  "light-glass": {
${serializeTokensObject(themeColors['light-glass'], 4)}
  },
  "dark-glass": {
${serializeTokensObject(themeColors['dark-glass'], 4)}
  },
} as const;
`;

  writeFileSync(OUTPUT_CSS, css);
  writeFileSync(OUTPUT_COLORS, colorsTs);
  console.info(`✅ Generated ${OUTPUT_CSS}`);
  console.info(`✅ Generated ${OUTPUT_COLORS}`);
}

generate();
