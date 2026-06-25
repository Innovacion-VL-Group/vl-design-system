import assetsBase64 from './assets-base64.json' with { type: 'json' };
import type {
  Background,
  BackgroundCategory,
  Backgrounds,
  Design,
  GetBackgroundParams,
  SmallImage,
  BackgroundCategoryKey
} from './types.js';

const THEME_TO_CATEGORY_MAP: Record<string, BackgroundCategoryKey> = {
  'dark-glass': 'dark-glass',
  'light-glass': 'light-glass',
  'Dark.Glass': 'dark-glass',
  'Light.Glass': 'light-glass',
  'Dark glass': 'dark-glass',
  'Light glass': 'light-glass',
  darkGlass: 'dark-glass',
  lightGlass: 'light-glass'
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
      ),
      'bg-dark-4': createImageBackground(
        'Dark Glass 4',
        'bg-dark-4.webp',
        assetsBase64['bg-dark-4.webp'] || ''
      ),
      'bg-dark-5': createImageBackground(
        'Dark Glass 5',
        'bg-dark-5.webp',
        assetsBase64['bg-dark-5.webp'] || ''
      ),
      'bg-dark-6': createImageBackground(
        'Dark Glass 6',
        'bg-dark-6.webp',
        assetsBase64['bg-dark-6.webp'] || ''
      ),
      'bg-dark-7': createImageBackground(
        'Dark Glass 7',
        'bg-dark-7.webp',
        assetsBase64['bg-dark-7.webp'] || ''
      ),
      'bg-dark-8': createImageBackground(
        'Dark Glass 8',
        'bg-dark-8.webp',
        assetsBase64['bg-dark-8.webp'] || ''
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
      ),
      'bg-light-3': createImageBackground(
        'Light Glass 3',
        'bg-light-3.webp',
        assetsBase64['bg-light-3.webp'] || ''
      )
    }
  };
}

const design: Design = {
  backgrounds: initializeBackgrounds()
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

function getAllImagesSmall(): SmallImage[] {
  const images: SmallImage[] = [];

  Object.entries(design.backgrounds).forEach(([category, backgrounds]) => {
    const bgCategory = backgrounds as BackgroundCategory;
    Object.entries(bgCategory).forEach(([, bg]) => {
      if (bg.dataUrl) {
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

export { getBackground, getAllImagesSmall };
export {
  VL_THEMES,
  DEFAULT_VL_THEME,
  isVLTheme
} from './theme/index.js';
export type {
  Design,
  Backgrounds,
  Background,
  BackgroundCategory,
  GetBackgroundParams,
  SmallImage
} from './types.js';
export type { VLTheme } from './theme/index.js';

export default design;
