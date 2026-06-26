import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@heroui/react/button';
import { useState } from 'react';
import { AppHeader } from '../../components/layout/AppHeader.js';
import { Sidebar } from '../../components/layout/Sidebar.js';
import { SubSidebar } from '../../components/layout/SubSidebar.js';
import { SubSidebarExpandTrigger } from '../../components/layout/SubSidebarExpandTrigger.js';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MenuIcon
} from '../helpers/icons.js';
import { mainNavItems, secondaryNavItems, subNavItems } from '../helpers/nav-items.js';

const meta = {
  title: 'Layout/AppShell',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(true);

    return (
      <div className="flex h-screen flex-col">
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
          toggleOpenIcon={<MenuIcon />}
          toggleCloseIcon={<CloseIcon />}
          logo={<span className="text-base font-semibold">VL App</span>}
          actions={
            <Button variant="primary" size="sm">
              Mi cuenta
            </Button>
          }
        />

        <div className="flex min-h-0 flex-1">
          <Sidebar
            isOpen={isSidebarOpen}
            items={mainNavItems}
            secondaryItems={secondaryNavItems}
          />

          {isSubSidebarOpen ? (
            <SubSidebar
              isOpen={isSubSidebarOpen}
              onToggle={() => setIsSubSidebarOpen(false)}
              items={subNavItems}
              collapseIcon={<ChevronLeftIcon />}
            />
          ) : (
            <SubSidebarExpandTrigger
              onExpand={() => setIsSubSidebarOpen(true)}
              expandIcon={<ChevronRightIcon />}
            />
          )}

          <main className="flex flex-1 flex-col gap-4 p-6">
            <h1 className="text-2xl font-semibold">Panel principal</h1>
            <p className="max-w-2xl text-muted">
              Composición de AppHeader, Sidebar, SubSidebar y
              SubSidebarExpandTrigger. Usa la barra de temas de Storybook para
              probar light, dark, light-glass y dark-glass.
            </p>
            <div className="rounded-xl border border-separator bg-surface p-4">
              Área de contenido
            </div>
          </main>
        </div>
      </div>
    );
  }
};
