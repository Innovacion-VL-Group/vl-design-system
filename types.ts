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
  'dark-glass': BackgroundCategory;
  'light-glass': BackgroundCategory;
  'solid-themes': BackgroundCategory;
}

export interface Themes {
  'dark-glass': string;
  'light-glass': string;
  'dark-solid': string;
  'light-solid': string;
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

export type ThemeKey = 'dark-glass' | 'light-glass' | 'dark-solid' | 'light-solid';
export type BackgroundCategoryKey = 'dark-glass' | 'light-glass' | 'solid-themes';

export interface ThemeColors {
  [key: string]: string;
}

