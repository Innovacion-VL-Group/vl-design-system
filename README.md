# VL Design System

Color themes and backgrounds library for VL design system.

## Installation

```bash
npm install git+ssh://git@github.com/Innovacion-VL-Group/vl-design-system.git
```

## Basic Usage

```typescript
import design from 'vl-design-system';

// Access colors
const primaryColor = design.defaults['Pimary-Regular'];
const blackColor = design.defaults['Default-Black'];

// Access backgrounds
const darkBg = design.backgrounds['dark-glass']['bg-dark-1'];
const solidBg = design.backgrounds['solid-themes']['solid-dark'];
```

## Usage in Next.js

Assets are embedded as base64 data URLs, so no file copying is needed. You can use them directly:

```tsx
'use client';

import Image from 'next/image';
import design from 'vl-design-system';

export function BackgroundSelector() {
  const darkGlassBg = design.backgrounds['dark-glass']['bg-dark-1'];
  const solidDark = design.backgrounds['solid-themes']['solid-dark'];

  return (
    <div>
      {/* Background image using dataUrl */}
      <div className="relative w-full h-64">
        <img
          src={darkGlassBg.dataUrl}
          alt={darkGlassBg.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Or with next/image using dataUrl */}
      <div className="relative w-full h-64">
        <Image
          src={darkGlassBg.dataUrl || ''}
          alt={darkGlassBg.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Or as CSS background */}
      <div
        style={{ backgroundImage: `url(${darkGlassBg.dataUrl})` }}
        className="w-full h-64 bg-cover bg-center"
      />

      {/* Solid color */}
      <div
        style={{ backgroundColor: solidDark.value }}
        className="w-full h-64 p-4"
      >
        <p className="text-white">Content on solid background</p>
      </div>
    </div>
  );
}
```

## Background Structure

Backgrounds are organized in three categories:

- **dark-glass**: Dark backgrounds with glass effect
- **light-glass**: Light backgrounds with glass effect  
- **solid-themes**: Solid colors (dark and white)

Each background has:
- `name`: Descriptive name
- `src`: Original file name
- `value`: Base64 data URL for images, or hexadecimal color for solids
- `dataUrl`: Base64 data URL (images only, same as `value` for images)
- `type`: 'image' or 'solid'

## Available Themes

- `dark-glass`
- `light-glass`
- `dark-solid`
- `light-solid`

## API

### `design.defaults`
Object with all available colors in the system.

### `design.backgrounds`
Object with all backgrounds organized by category.

### `design.themes`
Object with theme file paths.

### Helper Functions

#### `getBackground({ theme, bg })`
Get a background by theme and background name. If the background is not found in the specified theme, it searches in all categories.

```typescript
import { getBackground } from 'vl-design-system';

const bg = getBackground({ theme: 'dark-glass', bg: 'bg-dark-2' });
// Returns the background object or null if not found
```

#### `getThemeNames()`
Get an array of all available theme names.

```typescript
import { getThemeNames } from 'vl-design-system';

const themes = getThemeNames();
// Returns: ['dark-glass', 'light-glass', 'dark-solid', 'light-solid']
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

### Generating Assets and Themes

Generate base64 assets:

```bash
npm run generate-assets
```

Generate theme files:

```bash
npm run generate-themes
```

## License

ISC
