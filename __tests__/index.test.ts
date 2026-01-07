import design, { getBackground, getThemeNames, getAllImagesSmall } from '../index.js';
import { colors, type ColorName } from '../originals/colors.js';

describe('Design System', () => {
  describe('design.defaults', () => {
    it('should have all colors from colors.ts', () => {
      const colorKeys = Object.keys(colors) as ColorName[];
      expect(Object.keys(design.defaults)).toHaveLength(colorKeys.length);
      
      colorKeys.forEach((key) => {
        expect(design.defaults[key]).toBe(colors[key]);
      });
    });

    it('should have valid hex color values', () => {
      Object.values(design.defaults).forEach((color) => {
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });
  });

  describe('design.backgrounds', () => {
    it('should have all background categories', () => {
      expect(design.backgrounds).toHaveProperty('Dark glass');
      expect(design.backgrounds).toHaveProperty('Light glass');
      expect(design.backgrounds).toHaveProperty('Solid themes');
    });

    it('should have image backgrounds with dataUrl', () => {
      const darkGlass = design.backgrounds['Dark glass'];
      expect(darkGlass['bg-dark-1']).toMatchObject({
        name: 'Dark Glass 1',
        type: 'image',
        src: 'bg-dark-1.webp'
      });
      expect(darkGlass['bg-dark-1'].dataUrl).toBeDefined();
      expect(darkGlass['bg-dark-1'].dataUrl).toMatch(/^data:image\/webp;base64,/);
    });

    it('should have solid backgrounds with color values', () => {
      const solidThemes = design.backgrounds['Solid themes'];
      expect(solidThemes['solid-dark']).toMatchObject({
        name: 'Dark Solid',
        type: 'solid',
        value: colors['Default-Black']
      });
      expect(solidThemes['solid-white']).toMatchObject({
        name: 'White Solid',
        type: 'solid',
        value: colors['Default-White']
      });
    });
  });

  describe('design.themes', () => {
    it('should have all theme paths', () => {
      expect('Dark.Glass' in design.themes).toBe(true);
      expect('Light.Glass' in design.themes).toBe(true);
      expect('Dark.Solid' in design.themes).toBe(true);
      expect('Light.Solid' in design.themes).toBe(true);
    });

    it('should have valid theme file paths', () => {
      Object.values(design.themes).forEach((path) => {
        expect(path).toMatch(/^\.\/themes\/.*\.colors\.ts$/);
      });
    });
  });

  describe('getBackground', () => {
    it('should return background for valid theme and bg', () => {
      const bg = getBackground({ theme: 'Dark.Glass', bg: 'bg-dark-1' });
      expect(bg).not.toBeNull();
      expect(bg?.name).toBe('Dark Glass 1');
      expect(bg?.type).toBe('image');
    });

    it('should return background using alternative theme names', () => {
      const bg1 = getBackground({ theme: 'darkGlass', bg: 'bg-dark-1' });
      const bg2 = getBackground({ theme: 'solidDark', bg: 'solid-dark' });
      
      expect(bg1).not.toBeNull();
      expect(bg2).not.toBeNull();
    });

    it('should search in all categories if not found in specified theme', () => {
      const bg = getBackground({ theme: 'invalid', bg: 'bg-dark-1' });
      expect(bg).not.toBeNull();
      expect(bg?.name).toBe('Dark Glass 1');
    });

    it('should return null for non-existent background', () => {
      const bg = getBackground({ theme: 'Dark.Glass', bg: 'non-existent' });
      expect(bg).toBeNull();
    });
  });

  describe('getThemeNames', () => {
    it('should return array of theme names', () => {
      const themes = getThemeNames();
      expect(Array.isArray(themes)).toBe(true);
      expect(themes.length).toBe(4);
      expect(themes).toContain('Dark.Glass');
      expect(themes).toContain('Light.Glass');
      expect(themes).toContain('Dark.Solid');
      expect(themes).toContain('Light.Solid');
    });
  });

  describe('getAllImagesSmall', () => {
    it('should return array of image backgrounds', () => {
      const images = getAllImagesSmall();
      expect(Array.isArray(images)).toBe(true);
      expect(images.length).toBeGreaterThan(0);
    });

    it('should only include image type backgrounds', () => {
      const images = getAllImagesSmall();
      images.forEach((image) => {
        expect(image.dataUrl).toBeDefined();
        expect(image.dataUrl).toMatch(/^data:image\/webp;base64,/);
        expect(image.category).toBeDefined();
        expect(image.name).toBeDefined();
        expect(image.src).toBeDefined();
      });
    });

    it('should not include solid backgrounds', () => {
      const images = getAllImagesSmall();
      const solidBackgrounds = images.filter(
        (img) => img.category === 'Solid themes'
      );
      expect(solidBackgrounds.length).toBe(0);
    });
  });
});

