import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Container versátil para agrupar conteúdo relacionado. Suporta header, content e footer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Variante visual do card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding interno',
    },
    clickable: {
      control: 'boolean',
      description: 'Se o card é clicável',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o card ocupa toda a largura',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Ícone de exemplo
const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export const Default: Story = {
  args: {
    children: (
      <p style={{ margin: 0 }}>
        Este é um card simples com conteúdo de exemplo. Cards são usados para agrupar informações
        relacionadas.
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: <p style={{ margin: 0 }}>Card com sombra elevada (padrão).</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: <p style={{ margin: 0 }}>Card com borda e sem sombra.</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: <p style={{ margin: 0 }}>Card com fundo preenchido.</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Clickable: Story = {
  args: {
    clickable: true,
    children: <p style={{ margin: 0 }}>Clique neste card! Ele tem estados hover e focus.</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithHeader: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Card>
        <CardHeader
          title="Título do Card"
          subtitle="Subtítulo com informações adicionais"
          action={
            <Button variant="ghost" size="sm">
              <MoreIcon />
            </Button>
          }
        />
        <CardContent>
          <p style={{ margin: 0 }}>
            Conteúdo principal do card. Pode conter texto, imagens, formulários ou qualquer outro
            conteúdo.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Card>
        <CardContent>
          <p style={{ margin: 0 }}>
            Card com área de ações no footer. Ideal para botões de confirmação.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Cancelar
          </Button>
          <Button size="sm">Confirmar</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card>
        <CardHeader
          title="Configurações da Conta"
          subtitle="Gerencie suas preferências"
          action={
            <Button variant="ghost" size="sm">
              <MoreIcon />
            </Button>
          }
        />
        <CardContent>
          <p style={{ margin: 0 }}>
            Aqui você pode configurar suas preferências de notificação, privacidade e segurança da
            conta. As alterações são salvas automaticamente.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">
            Cancelar
          </Button>
          <Button size="sm">Salvar Alterações</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Card padding="none">
        <div
          style={{
            height: '160px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
        <CardHeader title="Card com Imagem" subtitle="Padding none para imagens full-width" />
        <CardContent>
          <p style={{ margin: 0 }}>O padding none permite que imagens ocupem toda a largura.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card variant="elevated" style={{ width: '200px' }}>
        <p style={{ margin: 0 }}>Elevated</p>
      </Card>
      <Card variant="outlined" style={{ width: '200px' }}>
        <p style={{ margin: 0 }}>Outlined</p>
      </Card>
      <Card variant="filled" style={{ width: '200px' }}>
        <p style={{ margin: 0 }}>Filled</p>
      </Card>
    </div>
  ),
};

export const AllPaddings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Card padding="none" variant="outlined">
        <p style={{ margin: '8px' }}>None</p>
      </Card>
      <Card padding="sm" variant="outlined">
        <p style={{ margin: 0 }}>Small</p>
      </Card>
      <Card padding="md" variant="outlined">
        <p style={{ margin: 0 }}>Medium</p>
      </Card>
      <Card padding="lg" variant="outlined">
        <p style={{ margin: 0 }}>Large</p>
      </Card>
    </div>
  ),
};
