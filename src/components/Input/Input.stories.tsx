import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo de entrada de texto com suporte a labels, ícones, validação e estados variados.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do input',
    },
    hasError: {
      control: 'boolean',
      description: 'Estado de erro',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o input ocupa toda a largura',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Ícones de exemplo
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const EyeIcon = () => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'John Doe',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    helperText: 'Nunca compartilharemos seu email.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    value: 'email-invalido',
    hasError: true,
    errorMessage: 'Por favor, insira um email válido.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Não é possível editar',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Input pequeno',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Input médio',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Input grande',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Largura total',
    placeholder: 'Ocupa toda a largura disponível',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Buscar...',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    rightIcon: <EyeIcon />,
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
    leftIcon: <MailIcon />,
    helperText: 'Digite seu email corporativo',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <Input label="Normal" placeholder="Estado normal" />
      <Input label="Com helper" placeholder="Com texto de ajuda" helperText="Texto de ajuda" />
      <Input
        label="Com erro"
        placeholder="Estado de erro"
        hasError
        errorMessage="Mensagem de erro"
        value="Valor inválido"
      />
      <Input label="Desabilitado" placeholder="Não editável" disabled />
      <Input label="Com ícone" placeholder="Buscar..." leftIcon={<SearchIcon />} />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="sm" placeholder="Small" label="Small" />
      <Input size="md" placeholder="Medium" label="Medium" />
      <Input size="lg" placeholder="Large" label="Large" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
