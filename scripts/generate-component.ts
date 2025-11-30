#!/usr/bin/env tsx
/**
 * Component Generator
 * Gera automaticamente a estrutura completa de um componente
 *
 * Uso:
 *   npm run generate ComponentName
 *   npm run generate ComponentName -- --spec=specs/ComponentName.json
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tipos
interface ComponentSpec {
  name: string;
  description?: string;
  variants?: string[];
  sizes?: string[];
  props?: PropSpec[];
  hasChildren?: boolean;
  isFormElement?: boolean;
}

interface PropSpec {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description?: string;
}

// Argumentos
const args = process.argv.slice(2);
const componentName = args[0];
const specArg = args.find(a => a.startsWith('--spec='));
const specPath = specArg?.split('=')[1];

if (!componentName) {
  console.error('❌ Uso: npm run generate ComponentName');
  console.error('   ou: npm run generate ComponentName -- --spec=specs/Component.json');
  process.exit(1);
}

// Carrega spec ou usa padrão
let spec: ComponentSpec;

if (specPath && existsSync(specPath)) {
  spec = JSON.parse(readFileSync(specPath, 'utf-8'));
  console.log(`📄 Usando spec: ${specPath}`);
} else {
  spec = {
    name: componentName,
    description: `${componentName} component`,
    variants: ['primary', 'secondary'],
    sizes: ['sm', 'md', 'lg'],
    hasChildren: true,
    props: [],
  };
  console.log(`📄 Usando spec padrão para: ${componentName}`);
}

// Paths
const COMPONENTS_DIR = resolve(__dirname, '../src/components');
const componentDir = resolve(COMPONENTS_DIR, spec.name);

// Verifica se já existe
if (existsSync(componentDir)) {
  console.error(`❌ Componente ${spec.name} já existe em ${componentDir}`);
  process.exit(1);
}

// Helpers
const kebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const camelCase = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

// Templates
function generateTSX(spec: ComponentSpec): string {
  const { name, description, variants, sizes, props, hasChildren, isFormElement } = spec;
  const variantType = variants?.length ? `'${variants.join("' | '")}'` : 'string';
  const sizeType = sizes?.length ? `'${sizes.join("' | '")}'` : 'string';

  const customProps = props?.map(p => {
    const optional = p.required ? '' : '?';
    return `  /** ${p.description || p.name} */\n  ${p.name}${optional}: ${p.type};`;
  }).join('\n') || '';

  const defaultVariant = variants?.[0] || 'primary';
  const defaultSize = sizes?.[1] || 'md';

  return `import { forwardRef, type ${isFormElement ? 'InputHTMLAttributes' : 'HTMLAttributes'}, type ReactNode } from 'react';
import styles from './${name}.module.css';

export type ${name}Variant = ${variantType};
export type ${name}Size = ${sizeType};

export interface ${name}Props extends ${isFormElement ? 'InputHTMLAttributes<HTMLInputElement>' : `HTMLAttributes<HTMLDivElement>`} {
  /** Variante visual do componente */
  variant?: ${name}Variant;
  /** Tamanho do componente */
  size?: ${name}Size;
${customProps}
${hasChildren ? '  /** Conteúdo do componente */\n  children?: ReactNode;' : ''}
}

/**
 * ${description || name}
 */
export const ${name} = forwardRef<${isFormElement ? 'HTMLInputElement' : 'HTMLDivElement'}, ${name}Props>(
  (
    {
      variant = '${defaultVariant}',
      size = '${defaultSize}',
${props?.map(p => `      ${p.name}${p.default ? ` = ${p.default}` : ''},`).join('\n') || ''}
${hasChildren ? '      children,' : ''}
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.${camelCase(name)},
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <${isFormElement ? 'input' : 'div'}
        ref={ref}
        className={classNames}
        {...props}
      ${isFormElement ? '/>' : `>
        {children}
      </div>`}
    );
  }
);

${name}.displayName = '${name}';

export default ${name};
`;
}

function generateCSS(spec: ComponentSpec): string {
  const { name, variants, sizes } = spec;
  const baseName = camelCase(name);

  const variantStyles = variants?.map(v => `
.${v} {
  /* TODO: Customize ${v} variant */
  ${v === 'primary' ? `background-color: var(--color-semantic-interactive-primary, #2563eb);
  color: var(--color-semantic-text-inverse, #ffffff);` : ''}
  ${v === 'secondary' ? `background-color: var(--color-semantic-background-secondary, #f5f5f5);
  color: var(--color-semantic-text-primary, #171717);` : ''}
  ${v === 'outline' ? `background-color: transparent;
  border: var(--border-width-1, 1px) solid var(--color-semantic-border-primary, #e5e5e5);
  color: var(--color-semantic-text-primary, #171717);` : ''}
}`).join('\n') || '';

  const sizeStyles = sizes?.map(s => `
.${s} {
  ${s === 'sm' ? `padding: var(--spacing-1, 4px) var(--spacing-2, 8px);
  font-size: var(--typography-font-size-sm, 14px);` : ''}
  ${s === 'md' ? `padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
  font-size: var(--typography-font-size-base, 16px);` : ''}
  ${s === 'lg' ? `padding: var(--spacing-3, 12px) var(--spacing-6, 24px);
  font-size: var(--typography-font-size-lg, 18px);` : ''}
}`).join('\n') || '';

  return `/* ${name} Component Styles */

.${baseName} {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--typography-font-family-sans, sans-serif);
  border-radius: var(--border-radius-md, 8px);
  transition: all var(--motion-duration-normal, 200ms) var(--motion-easing-ease-out, ease-out);
}

/* Variants */
${variantStyles}

/* Sizes */
${sizeStyles}
`;
}

function generateStories(spec: ComponentSpec): string {
  const { name, description, variants, sizes } = spec;

  const variantStories = variants?.map(v => `
export const ${v.charAt(0).toUpperCase() + v.slice(1)}: Story = {
  args: {
    children: '${v.charAt(0).toUpperCase() + v.slice(1)} ${name}',
    variant: '${v}',
  },
};`).join('\n') || '';

  const sizeStories = sizes?.map(s => `
export const Size${s.toUpperCase()}: Story = {
  args: {
    children: '${s.toUpperCase()} ${name}',
    size: '${s}',
  },
};`).join('\n') || '';

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${description || name}',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [${variants?.map(v => `'${v}'`).join(', ') || ''}],
      description: 'Variante visual',
    },
    size: {
      control: 'select',
      options: [${sizes?.map(s => `'${s}'`).join(', ') || ''}],
      description: 'Tamanho',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${name}',
  },
};
${variantStories}
${sizeStories}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      ${variants?.map(v => `<${name} variant="${v}">${v}</${name}>`).join('\n      ') || ''}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      ${sizes?.map(s => `<${name} size="${s}">${s}</${name}>`).join('\n      ') || ''}
    </div>
  ),
};
`;
}

function generateTests(spec: ComponentSpec): string {
  const { name, variants, sizes } = spec;

  return `import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders correctly with children', () => {
    render(<${name}>Test content</${name}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(<${name} variant="${variants?.[0] || 'primary'}">Content</${name}>);
    expect(container.firstChild).toHaveClass('${variants?.[0] || 'primary'}');
${variants?.slice(1).map(v => `
    rerender(<${name} variant="${v}">Content</${name}>);
    expect(container.firstChild).toHaveClass('${v}');`).join('') || ''}
  });

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<${name} size="${sizes?.[0] || 'sm'}">Content</${name}>);
    expect(container.firstChild).toHaveClass('${sizes?.[0] || 'sm'}');
${sizes?.slice(1).map(s => `
    rerender(<${name} size="${s}">Content</${name}>);
    expect(container.firstChild).toHaveClass('${s}');`).join('') || ''}
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<${name} className="custom-class">Content</${name}>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
`;
}

function generateIndex(spec: ComponentSpec): string {
  const { name, variants, sizes } = spec;

  return `export { ${name}, type ${name}Props, type ${name}Variant, type ${name}Size } from './${name}';
export { default } from './${name}';
`;
}

// Cria o componente
console.log(`\n🚀 Gerando componente: ${spec.name}\n`);

mkdirSync(componentDir, { recursive: true });

const files = [
  { name: `${spec.name}.tsx`, content: generateTSX(spec) },
  { name: `${spec.name}.module.css`, content: generateCSS(spec) },
  { name: `${spec.name}.stories.tsx`, content: generateStories(spec) },
  { name: `${spec.name}.test.tsx`, content: generateTests(spec) },
  { name: 'index.ts', content: generateIndex(spec) },
];

files.forEach(file => {
  const filePath = resolve(componentDir, file.name);
  writeFileSync(filePath, file.content);
  console.log(`   ✅ ${file.name}`);
});

// Atualiza o index de componentes
const componentsIndexPath = resolve(COMPONENTS_DIR, 'index.ts');
const componentsIndex = readFileSync(componentsIndexPath, 'utf-8');

if (!componentsIndex.includes(`'./${spec.name}'`)) {
  const updatedIndex = componentsIndex.trimEnd() + `\nexport * from './${spec.name}';\n`;
  writeFileSync(componentsIndexPath, updatedIndex);
  console.log(`   ✅ Atualizado src/components/index.ts`);
}

console.log(`
✨ Componente ${spec.name} criado com sucesso!

📁 ${componentDir}
   ├── ${spec.name}.tsx
   ├── ${spec.name}.module.css
   ├── ${spec.name}.stories.tsx
   ├── ${spec.name}.test.tsx
   └── index.ts

🚀 Próximos passos:
   1. Edite ${spec.name}.tsx para ajustar a lógica
   2. Edite ${spec.name}.module.css para os estilos
   3. Veja no Storybook: npm run dev
   4. Rode os testes: npm run test
`);
