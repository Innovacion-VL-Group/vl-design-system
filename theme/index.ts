export const VL_THEMES = ['light', 'dark', 'light-glass', 'dark-glass'] as const;

export type VLTheme = (typeof VL_THEMES)[number];

export const DEFAULT_VL_THEME: VLTheme = 'light';

export function isVLTheme(value: string): value is VLTheme {
  return (VL_THEMES as readonly string[]).includes(value);
}

export { themeColors } from './colors.js';
