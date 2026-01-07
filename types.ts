import type { ColorName, ColorValue } from './originals/colors.js';

export type { ColorName, ColorValue };

export type DesignDefaults = {
  [key: string]: ColorValue;
};

export interface Background {
  name: string;
  src: string;
  value: string;
  dataUrl?: string;
  type: 'image' | 'solid';
}

export interface BackgroundCategory {
  [key: string]: Background;
}

export interface Backgrounds {
  'Dark glass': BackgroundCategory;
  'Light glass': BackgroundCategory;
  'Solid themes': BackgroundCategory;
}

export interface Themes {
  'Dark.Glass': string;
  'Light.Glass': string;
  'Dark.Solid': string;
  'Light.Solid': string;
}

export interface Design {
  defaults: DesignDefaults;
  backgrounds: Backgrounds;
  themes: Themes;
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

export type ThemeKey = 'Dark.Glass' | 'Light.Glass' | 'Dark.Solid' | 'Light.Solid';
export type BackgroundCategoryKey = 'Dark glass' | 'Light glass' | 'Solid themes';

export interface ThemeColors {
  [key: string]: string;
}

