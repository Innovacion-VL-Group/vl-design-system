#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'theme', 'figma-theme-source.json');
const OUTPUT = join(ROOT, 'theme', 'heroui-theme.css');

const FIGMA_TO_HEROUI = {
  'accent/accent': 'accent',
  'accent/accent-foreground': 'accent-foreground',
  'background/background': 'background',
  border: 'border',
  'danger/danger': 'danger',
  'danger/danger-foreground': 'danger-foreground',
  'default/default': 'default',
  'default/default-foreground': 'default-foreground',
  'field/background': 'field-background',
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

const GLASS_OVERRIDES = {
  'light-glass': {
    Light: {
      background: { hex: '#f3f8fc', alpha: 0.72 },
      'surface': { hex: '#ffffff', alpha: 0.55 },
      'surface-secondary': { hex: '#ecf1f8', alpha: 0.45 },
      'surface-tertiary': { hex: '#eaeaeb', alpha: 0.38 },
      overlay: { hex: '#ffffff', alpha: 0.65 },
      'field-background': { hex: '#ffffff', alpha: 0.42 },
      'field-background-hover': { hex: '#ffffff', alpha: 0.52 },
      'field-background-focus': { hex: '#ffffff', alpha: 0.58 },
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
      'field-background-hover': { hex: '#1c1c1f', alpha: 0.48 },
      'field-background-focus': { hex: '#18181b', alpha: 0.55 },
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

function buildThemeVars(variables, mode, overrides = {}) {
  const byName = Object.fromEntries(variables.map((v) => [v.name, v]));
  const lines = [];

  for (const [figmaName, cssName] of Object.entries(FIGMA_TO_HEROUI)) {
    const variable = byName[figmaName];
    if (!variable) continue;

    let raw = variable.valuesByMode[mode];
    if (overrides[cssName]) raw = overrides[cssName];

    if (variable.resolvedType === 'COLOR') {
      const css = colorToCss(raw);
      if (css) lines.push(`  --${cssName}: ${css};`);
    }
  }

  return lines;
}

function buildBlock(selectors, lines, extraLines = []) {
  return `${selectors} {\n${[...lines, ...extraLines].join('\n')}\n}`;
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

  const lightLines = buildThemeVars(variables, 'Light');
  const darkLines = buildThemeVars(variables, 'Dark');
  const lightGlassLines = buildThemeVars(
    variables,
    'Light',
    GLASS_OVERRIDES['light-glass'].Light
  );
  const darkGlassLines = buildThemeVars(
    variables,
    'Dark',
    GLASS_OVERRIDES['dark-glass'].Dark
  );

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

  writeFileSync(OUTPUT, css);
  console.info(`✅ Generated ${OUTPUT}`);
}

generate();
