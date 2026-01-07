import { colors, type ColorName } from '../originals/colors.js';

describe('Colors', () => {
  it('should export colors object', () => {
    expect(colors).toBeDefined();
    expect(typeof colors).toBe('object');
  });

  it('should have all color keys as strings', () => {
    Object.keys(colors).forEach((key) => {
      expect(typeof key).toBe('string');
      expect(key.length).toBeGreaterThan(0);
    });
  });

  it('should have valid hex color values', () => {
    Object.entries(colors).forEach(([, value]) => {
      expect(value).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(typeof value).toBe('string');
    });
  });

  it('should have specific required colors', () => {
    expect(colors['Default-Black']).toBe('#252525');
    expect(colors['Default-White']).toBe('#FFFFFF');
    expect(colors['Default-Soft-white']).toBe('#FBFBFB');
    expect(colors['Pimary-Regular']).toBe('#1BAFB2');
  });

  it('should have gray scale colors', () => {
    const grayKeys = Object.keys(colors).filter((key) => key.startsWith('Gray-'));
    expect(grayKeys.length).toBeGreaterThan(0);
    
    grayKeys.forEach((key) => {
      const colorKey = key as ColorName;
      expect(colors[colorKey]).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

