import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNavItem } from '../../components/layout/SidebarNavItem.js';
import { ChartIcon, HomeIcon } from '../helpers/icons.js';

const meta = {
  title: 'Layout/SidebarNavItem',
  component: SidebarNavItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-64 rounded-xl border border-separator bg-background p-2">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SidebarNavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MainActive: Story = {
  args: {
    variant: 'main',
    item: {
      id: 'home',
      label: 'Inicio',
      href: '#home',
      icon: <HomeIcon />,
      isActive: true
    }
  }
};

export const MainInactive: Story = {
  args: {
    variant: 'main',
    item: {
      id: 'analytics',
      label: 'Analítica',
      href: '#analytics',
      icon: <ChartIcon />
    }
  }
};

export const SubActive: Story = {
  args: {
    variant: 'sub',
    item: {
      id: 'overview',
      label: 'Resumen',
      href: '#overview',
      isActive: true
    }
  }
};

export const SubInactive: Story = {
  args: {
    variant: 'sub',
    item: {
      id: 'reports',
      label: 'Reportes',
      href: '#reports'
    }
  }
};
