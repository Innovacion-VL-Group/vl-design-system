export interface Background {
    name: string;
    src: string;
    value: string;
    dataUrl?: string;
    type: 'image';
}
export interface BackgroundCategory {
    [key: string]: Background;
}
export interface Backgrounds {
    'dark-glass': BackgroundCategory;
    'light-glass': BackgroundCategory;
}
export interface Design {
    backgrounds: Backgrounds;
}
export interface GetBackgroundParams {
    theme: string;
    bg: string;
}
export interface SmallImage {
    name: string;
    src: string;
    dataUrl: string;
    category: string;
    thumbnail?: string;
}
export type BackgroundCategoryKey = 'dark-glass' | 'light-glass';
//# sourceMappingURL=types.d.ts.map