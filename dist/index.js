import { colors } from './originals/colors.js';
import assetsBase64 from './assets-base64.json' with { type: 'json' };
const THEME_TO_CATEGORY_MAP = {
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
function createImageBackground(name, src, dataUrl) {
    return {
        name,
        src,
        value: dataUrl,
        dataUrl,
        type: 'image'
    };
}
function createSolidBackground(name, color) {
    return {
        name,
        src: color,
        value: color,
        type: 'solid'
    };
}
function initializeDefaults() {
    const defaults = {};
    Object.keys(colors).forEach((colorName) => {
        defaults[colorName] = colors[colorName];
    });
    return defaults;
}
function initializeBackgrounds() {
    return {
        'dark-glass': {
            'bg-dark-1': createImageBackground('Dark Glass 1', 'bg-dark-1.webp', assetsBase64['bg-dark-1.webp'] || ''),
            'bg-dark-2': createImageBackground('Dark Glass 2', 'bg-dark-2.webp', assetsBase64['bg-dark-2.webp'] || ''),
            'bg-dark-3': createImageBackground('Dark Glass 3', 'bg-dark-3.webp', assetsBase64['bg-dark-3.webp'] || ''),
            'bg-dark-4': createImageBackground('Dark Glass 4', 'bg-dark-4.webp', assetsBase64['bg-dark-4.webp'] || ''),
            'bg-dark-5': createImageBackground('Dark Glass 5', 'bg-dark-5.webp', assetsBase64['bg-dark-5.webp'] || ''),
            'bg-dark-6': createImageBackground('Dark Glass 6', 'bg-dark-6.webp', assetsBase64['bg-dark-6.webp'] || ''),
            'bg-dark-7': createImageBackground('Dark Glass 7', 'bg-dark-7.webp', assetsBase64['bg-dark-7.webp'] || ''),
            'bg-dark-8': createImageBackground('Dark Glass 8', 'bg-dark-8.webp', assetsBase64['bg-dark-8.webp'] || '')
        },
        'light-glass': {
            'bg-light-1': createImageBackground('Light Glass 1', 'bg-light-1.webp', assetsBase64['bg-light-1.webp'] || ''),
            'bg-light-2': createImageBackground('Light Glass 2', 'bg-light-2.webp', assetsBase64['bg-light-2.webp'] || ''),
            'bg-light-3': createImageBackground('Light Glass 3', 'bg-light-3.webp', assetsBase64['bg-light-3.webp'] || '')
        },
        'solid-themes': {
            'solid-dark': createSolidBackground('Dark Solid', colors['Default-Black']),
            'solid-white': createSolidBackground('White Solid', colors['Default-White'])
        }
    };
}
const design = {
    defaults: initializeDefaults(),
    backgrounds: initializeBackgrounds(),
    themes: {
        'dark-glass': './themes/Dark.Glass.colors.ts',
        'light-glass': './themes/Light.Glass.colors.ts',
        'dark-solid': './themes/Dark.Solid.colors.ts',
        'light-solid': './themes/Light.Solid.colors.ts'
    }
};
function getBackground(params) {
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
function getThemeNames() {
    return Object.keys(design.themes);
}
function getAllImagesSmall() {
    const images = [];
    Object.entries(design.backgrounds).forEach(([category, backgrounds]) => {
        const bgCategory = backgrounds;
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
export default design;
