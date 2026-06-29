import type { Meta, StoryObj } from '@storybook/react';
import { SubSidebarExpandTrigger } from '../../components/layout/SubSidebarExpandTrigger.js';
import { ChevronRightIcon } from '../helpers/icons.js';

const meta: Meta<typeof SubSidebarExpandTrigger> = {
  title: 'Layout/SubSidebarExpandTrigger',
  component: SubSidebarExpandTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative h-64 w-0 shrink-0 self-stretch border border-separator bg-background">
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onExpand: () => undefined,
    expandIcon: <ChevronRightIcon />
  }
};
