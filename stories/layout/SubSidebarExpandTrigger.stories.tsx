import type { Meta, StoryObj } from '@storybook/react';
import { SubSidebarExpandTrigger } from '../../components/layout/SubSidebarExpandTrigger.js';
import { ChevronRightIcon } from '../helpers/icons.js';

const meta = {
  title: 'Layout/SubSidebarExpandTrigger',
  component: SubSidebarExpandTrigger,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex h-64 items-end border border-separator bg-background">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SubSidebarExpandTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onExpand: () => undefined,
    expandIcon: <ChevronRightIcon />
  }
};
