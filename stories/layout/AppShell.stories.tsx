import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@heroui/react/button';
import { AppShell } from '../../components/layout/AppShell.js';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MenuIcon
} from '../helpers/icons.js';
import { useGlassBackgroundStyles } from '../helpers/glass-background.js';
import { mainNavItems, secondaryNavItems, subNavItems } from '../helpers/nav-items.js';

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const { shellStyle, componentStyle } = useGlassBackgroundStyles();

    return (
      <AppShell
        shellStyle={shellStyle}
        glassStyle={componentStyle}
        toggleOpenIcon={<MenuIcon />}
        toggleCloseIcon={<CloseIcon />}
        collapseIcon={<ChevronLeftIcon />}
        expandIcon={<ChevronRightIcon />}
        logo={<span className="text-base font-semibold">VL App</span>}
        headerActions={
          <Button variant="primary" size="sm">
            Mi cuenta
          </Button>
        }
        mainNavItems={mainNavItems}
        secondaryNavItems={secondaryNavItems}
        subNavItems={subNavItems}
      >
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-2xl font-semibold">Panel principal</h1>
          <p className="max-w-2xl text-muted">
            Composición de AppHeader, Sidebar, SubSidebar y
            SubSidebarExpandTrigger. En mobile el header y los sidebars son
            fixed; solo puede abrirse uno a la vez. Usa la barra de temas para
            probar light, dark, light-glass y dark-glass.
          </p>
          <div className="rounded-xl border border-separator bg-surface p-4">
            Área de contenido
          </div>
        </div>
      </AppShell>
    );
  }
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: Default.render
};
