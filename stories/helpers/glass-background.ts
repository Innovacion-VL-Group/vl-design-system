import { useEffect, useState, type CSSProperties } from 'react';
import design from '../../index.js';
import { isVLTheme, type VLTheme } from '../../theme/index.js';

function readTheme(): VLTheme {
  const themed = document.querySelector('[data-theme]');
  const value = themed?.getAttribute('data-theme') ?? 'light';
  return isVLTheme(value) ? value : 'light';
}

export const GLASS_COMPONENT_STYLE: CSSProperties = {
  backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturation))'
};

export function useGlassBackgroundStyles(): {
  shellStyle?: CSSProperties;
  componentStyle?: CSSProperties;
} {
  const [theme, setTheme] = useState<VLTheme>(readTheme);

  useEffect(() => {
    const themed = document.querySelector('[data-theme]');
    if (!themed) return;

    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(themed, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isGlass = theme === 'light-glass' || theme === 'dark-glass';
  if (!isGlass) return {};

  const category = theme === 'light-glass' ? 'light-glass' : 'dark-glass';
  const key = theme === 'light-glass' ? 'bg-light-1' : 'bg-dark-1';
  const dataUrl = design.backgrounds[category][key]?.dataUrl;

  return {
    shellStyle: dataUrl
      ? {
          backgroundImage: `url(${dataUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      : undefined,
    componentStyle: GLASS_COMPONENT_STYLE
  };
}
