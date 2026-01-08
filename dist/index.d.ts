import type { Background, Design, GetBackgroundParams, SmallImage } from './types.js';
declare const design: Design;
declare function getBackground(params: GetBackgroundParams): Background | null;
declare function getThemeNames(): string[];
declare function getAllImagesSmall(): SmallImage[];
export { getBackground, getThemeNames, getAllImagesSmall };
export type { Design, DesignDefaults, Backgrounds, Themes, Background, BackgroundCategory, GetBackgroundParams, SmallImage } from './types.js';
export type { ColorName, ColorValue } from './originals/colors.js';
export default design;
//# sourceMappingURL=index.d.ts.map