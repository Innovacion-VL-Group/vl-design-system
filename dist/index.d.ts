import type { Background, Design, GetBackgroundParams, SmallImage } from './types.js';
declare const design: Design;
declare function getBackground(params: GetBackgroundParams): Background | null;
declare function getAllImagesSmall(): SmallImage[];
export { getBackground, getAllImagesSmall };
export { VL_THEMES, DEFAULT_VL_THEME, isVLTheme } from './theme/index.js';
export type { Design, Backgrounds, Background, BackgroundCategory, GetBackgroundParams, SmallImage } from './types.js';
export type { VLTheme } from './theme/index.js';
export default design;
//# sourceMappingURL=index.d.ts.map