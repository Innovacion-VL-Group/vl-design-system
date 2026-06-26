import type { SidebarNavItemData } from '../../components/layout/types.js';
import { ChartIcon, HelpIcon, HomeIcon, SettingsIcon } from './icons.js';

export const mainNavItems: SidebarNavItemData[] = [
  {
    id: 'home',
    label: 'Inicio',
    href: '#home',
    icon: <HomeIcon />,
    isActive: true
  },
  {
    id: 'analytics',
    label: 'Analítica',
    href: '#analytics',
    icon: <ChartIcon />
  },
  {
    id: 'settings',
    label: 'Configuración',
    href: '#settings',
    icon: <SettingsIcon />
  }
];

export const secondaryNavItems: SidebarNavItemData[] = [
  {
    id: 'help',
    label: 'Ayuda',
    href: '#help',
    icon: <HelpIcon />
  }
];

export const subNavItems: SidebarNavItemData[] = [
  { id: 'overview', label: 'Resumen', href: '#overview', isActive: true },
  { id: 'reports', label: 'Reportes', href: '#reports' },
  { id: 'exports', label: 'Exportaciones', href: '#exports' }
];
