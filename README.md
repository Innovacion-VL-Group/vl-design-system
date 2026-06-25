# VL Design System

Backgrounds and HeroUI theme tokens for the VL design system. Theme colors are synced from the Figma collection **02_Theme (HeroUI)**.

## Installation

```bash
npm install git+ssh://git@github.com/Innovacion-VL-Group/vl-design-system.git
```

Also install HeroUI in your app:

```bash
npm install @heroui/styles @heroui/react
```

## HeroUI theme (global.css)

Import the generated theme **after** `@heroui/styles` in your `global.css`:

```css
@import "@heroui/styles";
@import "vl-design-system/theme/heroui-theme.css";
```

Available themes via `data-theme` or class:

| Tema | Selector |
|------|----------|
| Light | `.light`, `[data-theme="light"]`, `:root` |
| Dark | `.dark`, `[data-theme="dark"]` |
| Light Glass | `.light-glass`, `[data-theme="light-glass"]` |
| Dark Glass | `.dark-glass`, `[data-theme="dark-glass"]` |

Glass themes use semi-transparent surfaces and expose `--glass-blur` / `--glass-saturation` for backdrop effects.

### Cambiar de tema con React

```tsx
'use client';

import { useState } from 'react';
import design, { VL_THEMES, type VLTheme } from 'vl-design-system';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<VLTheme>('light');

  const isGlass = theme === 'light-glass' || theme === 'dark-glass';
  const bgKey = theme === 'light-glass' ? 'bg-light-1' : 'bg-dark-1';
  const bgCategory = theme === 'light-glass' ? 'light-glass' : 'dark-glass';
  const background = isGlass
    ? design.backgrounds[bgCategory][bgKey]?.dataUrl
    : undefined;

  return (
    <div
      data-theme={theme}
      className="min-h-screen text-foreground"
      style={
        isGlass
          ? {
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : undefined
      }
    >
      <div
        className="mx-auto max-w-md space-y-4 p-6"
        style={
          isGlass
            ? {
                backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturation))'
              }
            : undefined
        }
      >
        <label htmlFor="theme-select" className="text-sm text-muted">
          Tema
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as VLTheme)}
          className="w-full rounded-lg border border-border bg-field-background px-3 py-2"
        >
          {VL_THEMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="rounded-lg bg-accent px-4 py-2 text-accent-foreground"
        >
          Botón HeroUI
        </button>
      </div>
    </div>
  );
}
```

Aplica `data-theme` en `<html>` o en un contenedor raíz para que HeroUI herede las CSS variables del tema activo.

## Backgrounds — uso básico

```typescript
import design from 'vl-design-system';

const darkBg = design.backgrounds['dark-glass']['bg-dark-1'];
const lightBg = design.backgrounds['light-glass']['bg-light-1'];
```

## Usage in Next.js

Assets are embedded as base64 data URLs, so no file copying is needed. You can use them directly:

```tsx
'use client';

import Image from 'next/image';
import design from 'vl-design-system';

export function BackgroundSelector() {
  const darkGlassBg = design.backgrounds['dark-glass']['bg-dark-1'];

  return (
    <div>
      <div className="relative w-full h-64">
        <img
          src={darkGlassBg.dataUrl}
          alt={darkGlassBg.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full h-64">
        <Image
          src={darkGlassBg.dataUrl || ''}
          alt={darkGlassBg.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div
        style={{ backgroundImage: `url(${darkGlassBg.dataUrl})` }}
        className="w-full h-64 bg-cover bg-center"
      />
    </div>
  );
}
```

## Background Structure

Backgrounds are organized in two categories:

- **dark-glass**: Dark backgrounds with glass effect (8 images)
- **light-glass**: Light backgrounds with glass effect (3 images)

Each background has:
- `name`: Descriptive name
- `src`: Original file name
- `value`: Base64 data URL
- `dataUrl`: Base64 data URL (same as `value`)
- `type`: `'image'`

## API

### `design.backgrounds`
Object with all backgrounds organized by category.

### Helper Functions

#### `getBackground({ theme, bg })`
Get a background by theme and background name. If the background is not found in the specified theme, it searches in all categories.

```typescript
import { getBackground } from 'vl-design-system';

const bg = getBackground({ theme: 'dark-glass', bg: 'bg-dark-2' });
// Returns the background object or null if not found
```

#### `getAllImagesSmall()`
Get all image backgrounds in a compact format.

```typescript
import { getAllImagesSmall } from 'vl-design-system';

const images = getAllImagesSmall();
// Returns array of SmallImage objects with name, src, dataUrl, and category
```

## Development

### Running Tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

### Linting

Check code quality:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint:fix
```

### Building

Compile TypeScript to JavaScript:

```bash
npm run build
```

This generates the `dist/` folder with compiled JavaScript files and type definitions. The build is automatically run before publishing.

### Generating Assets

Generate base64 assets:

```bash
npm run generate-assets
```

### Regenerating HeroUI theme from Figma

Update `theme/figma-theme-source.json` (exported from Figma **02_Theme (HeroUI)**) and run:

```bash
npm run generate-theme
```

This regenerates `theme/heroui-theme.css`.

## License

ISC
