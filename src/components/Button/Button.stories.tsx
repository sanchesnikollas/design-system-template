import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botão interativo com múltiplas variantes, tamanhos e estados. Suporta ícones e loading.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o botão ocupa toda a largura',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Ícone de exemplo
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const Primary: Story = {
  args: {
    children: 'Botão Primário',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Botão Secundário',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Botão Outline',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Botão Ghost',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Excluir',
    variant: 'danger',
  },
};

export const Small: Story = {
  args: {
    children: 'Pequeno',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Médio',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Grande',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Largura Total',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Loading: Story = {
  args: {
    children: 'Carregando...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Desabilitado',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Adicionar',
    leftIcon: <PlusIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Próximo',
    rightIcon: <ArrowRightIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Ação',
    leftIcon: <PlusIcon />,
    rightIcon: <ArrowRightIcon />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
