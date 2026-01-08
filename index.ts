import { colors } from './originals/colors.js';
import assetsBase64 from './assets-base64.json' with { type: 'json' };
import type {
  DesignDefaults,
  Background,
  BackgroundCategory,
  Backgrounds,
  Design,
  GetBackgroundParams,
  SmallImage,
  BackgroundCategoryKey
} from './types.js';
import type { ColorName, ColorValue } from './originals/colors.js';

const THEME_TO_CATEGORY_MAP: Record<string, BackgroundCategoryKey> = {
  'dark-glass': 'dark-glass',
  'light-glass': 'light-glass',
  'dark-solid': 'solid-themes',
  'light-solid': 'solid-themes',
  'Dark.Glass': 'dark-glass',
  'Light.Glass': 'light-glass',
  'Dark.Solid': 'solid-themes',
  'Light.Solid': 'solid-themes',
  'Dark glass': 'dark-glass',
  'Light glass': 'light-glass',
  'Solid themes': 'solid-themes',
  darkGlass: 'dark-glass',
  lightGlass: 'light-glass',
  darkSolid: 'solid-themes',
  lightSolid: 'solid-themes',
  solidDark: 'solid-themes',
  solidWhite: 'solid-themes'
};

function createImageBackground(
  name: string,
  src: string,
  dataUrl: string
): Background {
  return {
    name,
    src,
    value: dataUrl,
    dataUrl,
    type: 'image'
  };
}

function createSolidBackground(
  name: string,
  color: ColorValue
): Background {
  return {
    name,
    src: color,
    value: color,
    type: 'solid'
  };
}

function initializeDefaults(): DesignDefaults {
  const defaults: DesignDefaults = {};
  (Object.keys(colors) as ColorName[]).forEach((colorName: ColorName) => {
    defaults[colorName] = colors[colorName];
  });
  return defaults;
}

function initializeBackgrounds(): Backgrounds {
  return {
    'dark-glass': {
      'bg-dark-1': createImageBackground(
        'Dark Glass 1',
        'bg-dark-1.webp',
        assetsBase64['bg-dark-1.webp'] || ''
      ),
      'bg-dark-2': createImageBackground(
        'Dark Glass 2',
        'bg-dark-2.webp',
        assetsBase64['bg-dark-2.webp'] || ''
      ),
      'bg-dark-3': createImageBackground(
        'Dark Glass 3',
        'bg-dark-3.webp',
        assetsBase64['bg-dark-3.webp'] || ''
      )
    },
    'light-glass': {
      'bg-light-1': createImageBackground(
        'Light Glass 1',
        'bg-light-1.webp',
        assetsBase64['bg-light-1.webp'] || ''
      ),
      'bg-light-2': createImageBackground(
        'Light Glass 2',
        'bg-light-2.webp',
        assetsBase64['bg-light-2.webp'] || ''
      )
    },
    'solid-themes': {
      'solid-dark': createSolidBackground('Dark Solid', colors['Default-Black']),
      'solid-white': createSolidBackground('White Solid', colors['Default-White'])
    }
  };
}

const design: Design = {
  defaults: initializeDefaults(),
  backgrounds: initializeBackgrounds(),
  themes: {
    'dark-glass': './themes/Dark.Glass.colors.ts',
    'light-glass': './themes/Light.Glass.colors.ts',
    'dark-solid': './themes/Dark.Solid.colors.ts',
    'light-solid': './themes/Light.Solid.colors.ts'
  }
};

function getBackground(params: GetBackgroundParams): Background | null {
  const { theme, bg } = params;
  const category = THEME_TO_CATEGORY_MAP[theme];

  if (category) {
    const categoryBackgrounds = design.backgrounds[category];
    if (categoryBackgrounds?.[bg]) {
      return categoryBackgrounds[bg];
    }
  }

  for (const backgrounds of Object.values(design.backgrounds)) {
    if (backgrounds[bg]) {
      return backgrounds[bg];
    }
  }

  return null;
}

function getThemeNames(): string[] {
  return Object.keys(design.themes);
}

function getAllImagesSmall(): SmallImage[] {
  const images: SmallImage[] = [];

  Object.entries(design.backgrounds).forEach(([category, backgrounds]) => {
    const bgCategory = backgrounds as BackgroundCategory;
    Object.entries(bgCategory).forEach(([, bg]) => {
      if (bg.type === 'image' && bg.dataUrl) {
        images.push({
          name: bg.name,
          src: bg.src,
          dataUrl: bg.dataUrl,
          category
        });
      }
    });
  });

  return images;
}

export { getBackground, getThemeNames, getAllImagesSmall };
export type {
  Design,
  DesignDefaults,
  Backgrounds,
  Themes,
  Background,
  BackgroundCategory,
  GetBackgroundParams,
  SmallImage
} from './types.js';
export type { ColorName, ColorValue } from './originals/colors.js';

export default design;
