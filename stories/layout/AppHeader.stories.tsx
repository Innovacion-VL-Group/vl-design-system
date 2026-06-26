import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@heroui/react/button';
import { useState } from 'react';
import { AppHeader } from '../../components/layout/AppHeader.js';
import { CloseIcon, MenuIcon } from '../helpers/icons.js';

const meta = {
  title: 'Layout/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
      <AppHeader
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
        toggleOpenIcon={<MenuIcon />}
        toggleCloseIcon={<CloseIcon />}
        logo={<span className="text-base font-semibold">VL Design System</span>}
        actions={
          <>
            <Button variant="ghost" size="sm">
              Notificaciones
            </Button>
            <Button variant="primary" size="sm">
              Cuenta
            </Button>
          </>
        }
      />
    );
  }
};

export const SidebarOpen: Story = {
  args: {
    isSidebarOpen: true,
    onSidebarToggle: () => undefined,
    toggleOpenIcon: <MenuIcon />,
    toggleCloseIcon: <CloseIcon />,
    logo: <span className="text-base font-semibold">VL Design System</span>
  }
};
