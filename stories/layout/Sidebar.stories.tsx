import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar.js';
import { mainNavItems, secondaryNavItems } from '../helpers/nav-items.js';

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: () => (
    <div className="flex h-[640px] border border-separator">
      <Sidebar
        isOpen
        items={mainNavItems}
        secondaryItems={secondaryNavItems}
      />
      <main className="flex flex-1 items-center justify-center p-6 text-muted">
        Contenido principal
      </main>
    </div>
  )
};

export const Closed: Story = {
  render: () => (
    <div className="flex h-[640px] border border-separator">
      <Sidebar
        isOpen={false}
        items={mainNavItems}
        secondaryItems={secondaryNavItems}
      />
      <main className="flex flex-1 items-center justify-center p-6 text-muted">
        Sidebar colapsado
      </main>
    </div>
  )
};

export const Interactive: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="flex h-[640px] flex-col border border-separator">
        <div className="border-b border-separator px-4 py-2">
          <button
            type="button"
            className="rounded-lg bg-default px-3 py-1.5 text-sm"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
          </button>
        </div>
        <div className="flex min-h-0 flex-1">
          <Sidebar
            isOpen={isOpen}
            items={mainNavItems}
            secondaryItems={secondaryNavItems}
            footer={
              <div className="rounded-[20px] bg-surface-secondary px-3 py-2 text-xs text-muted">
                v1.0.1
              </div>
            }
          />
          <main className="flex flex-1 items-center justify-center p-6 text-muted">
            Usa el botón superior para alternar el sidebar
          </main>
        </div>
      </div>
    );
  }
};
