import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge para indicar status, contagem ou categorias',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Variante visual',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Default: Story = {
  args: {
    children: 'Default Badge',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Badge',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Badge',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error Badge',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    children: 'Info Badge',
    variant: 'info',
  },
};

export const SizeSM: Story = {
  args: {
    children: 'SM Badge',
    size: 'sm',
  },
};

export const SizeMD: Story = {
  args: {
    children: 'MD Badge',
    size: 'md',
  },
};

export const SizeLG: Story = {
  args: {
    children: 'LG Badge',
    size: 'lg',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="default">default</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="error">error</Badge>
      <Badge variant="info">info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge size="sm">sm</Badge>
      <Badge size="md">md</Badge>
      <Badge size="lg">lg</Badge>
    </div>
  ),
};
