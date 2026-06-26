import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SubSidebar } from '../../components/layout/SubSidebar.js';
import { ChevronLeftIcon } from '../helpers/icons.js';
import { subNavItems } from '../helpers/nav-items.js';

const meta = {
  title: 'Layout/SubSidebar',
  component: SubSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
} satisfies Meta<typeof SubSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="flex h-[640px] border border-separator">
        <SubSidebar
          isOpen={isOpen}
          onToggle={() => setIsOpen(false)}
          items={subNavItems}
          collapseIcon={<ChevronLeftIcon />}
        />
        <main className="flex flex-1 items-center justify-center p-6 text-muted">
          Submenú abierto
        </main>
      </div>
    );
  }
};

export const Closed: Story = {
  render: () => (
    <div className="flex h-[640px] border border-separator">
      <SubSidebar
        isOpen={false}
        onToggle={() => undefined}
        items={subNavItems}
        collapseIcon={<ChevronLeftIcon />}
      />
      <main className="flex flex-1 items-center justify-center p-6 text-muted">
        Submenú colapsado
      </main>
    </div>
  )
};
