import design, { getBackground, getAllImagesSmall } from '../index.js';

describe('Design System', () => {
  describe('design.backgrounds', () => {
    it('should have all background categories', () => {
      expect(design.backgrounds).toHaveProperty('dark-glass');
      expect(design.backgrounds).toHaveProperty('light-glass');
    });

    it('should have image backgrounds with dataUrl', () => {
      const darkGlass = design.backgrounds['dark-glass'];
      expect(darkGlass['bg-dark-1']).toMatchObject({
        name: 'Dark Glass 1',
        type: 'image',
        src: 'bg-dark-1.webp'
      });
      expect(darkGlass['bg-dark-1'].dataUrl).toBeDefined();
      expect(darkGlass['bg-dark-1'].dataUrl).toMatch(/^data:image\/webp;base64,/);
    });

    it('should have 8 dark and 3 light backgrounds', () => {
      expect(Object.keys(design.backgrounds['dark-glass'])).toHaveLength(8);
      expect(Object.keys(design.backgrounds['light-glass'])).toHaveLength(3);
    });
  });

  describe('getBackground', () => {
    it('should return background for valid theme and bg', () => {
      const bg = getBackground({ theme: 'dark-glass', bg: 'bg-dark-1' });
      expect(bg).not.toBeNull();
      expect(bg?.name).toBe('Dark Glass 1');
      expect(bg?.type).toBe('image');
    });

    it('should return background using alternative theme names', () => {
      const bg1 = getBackground({ theme: 'darkGlass', bg: 'bg-dark-1' });
      const bg2 = getBackground({ theme: 'light-glass', bg: 'bg-light-1' });

      expect(bg1).not.toBeNull();
      expect(bg2).not.toBeNull();
    });

    it('should support legacy theme names for backward compatibility', () => {
      const bg1 = getBackground({ theme: 'Dark.Glass', bg: 'bg-dark-1' });
      const bg2 = getBackground({ theme: 'Light glass', bg: 'bg-light-1' });

      expect(bg1).not.toBeNull();
      expect(bg2).not.toBeNull();
    });

    it('should search in all categories if not found in specified theme', () => {
      const bg = getBackground({ theme: 'invalid', bg: 'bg-dark-1' });
      expect(bg).not.toBeNull();
      expect(bg?.name).toBe('Dark Glass 1');
    });

    it('should return null for non-existent background', () => {
      const bg = getBackground({ theme: 'dark-glass', bg: 'non-existent' });
      expect(bg).toBeNull();
    });
  });

  describe('getAllImagesSmall', () => {
    it('should return array of image backgrounds', () => {
      const images = getAllImagesSmall();
      expect(Array.isArray(images)).toBe(true);
      expect(images.length).toBe(11);
    });

    it('should include all image backgrounds with required fields', () => {
      const images = getAllImagesSmall();
      images.forEach((image) => {
        expect(image.dataUrl).toBeDefined();
        expect(image.dataUrl).toMatch(/^data:image\/webp;base64,/);
        expect(image.category).toBeDefined();
        expect(image.name).toBeDefined();
        expect(image.src).toBeDefined();
      });
    });
  });
});
