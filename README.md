# Design System Template

Um Design System vivo, integrado com Figma via Tokens Studio, projetado para ser customizado por cliente.

## Visão Geral

Este template fornece uma base sólida para criar Design Systems personalizados por cliente, mantendo:

- **Sincronização automática** com Figma via Tokens Studio
- **Componentes React** acessíveis e testados
- **Documentação viva** com Storybook
- **CI/CD automatizado** com GitHub Actions
- **Publicação privada** via GitHub Packages

## Quick Start

```bash
# Clonar o template
git clone https://github.com/seu-usuario/design-system-template.git ds-cliente-x
cd ds-cliente-x

# Instalar dependências
npm install

# Buildar tokens
npm run build:tokens

# Iniciar Storybook
npm run dev
```

## Estrutura do Projeto

```
design-system/
├── .github/
│   └── workflows/           # CI/CD (build, test, release)
├── .storybook/              # Configuração do Storybook
├── tokens/
│   ├── tokens.json          # Tokens sincronizados do Figma
│   └── $themes.json         # Configuração de temas
├── src/
│   ├── components/          # Componentes React
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   ├── tokens/              # Tokens compilados (CSS, JS)
│   ├── styles/              # Estilos globais
│   └── index.ts             # Entry point
├── scripts/
│   └── build-tokens.ts      # Script de build dos tokens
└── package.json
```

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o Storybook em modo dev |
| `npm run build` | Build completo (tokens + lib) |
| `npm run build:tokens` | Compila tokens do JSON para CSS/JS |
| `npm run build:storybook` | Build estático do Storybook |
| `npm run test` | Executa testes |
| `npm run lint` | Verifica linting |

## Integração com Figma

### Configurando Tokens Studio

1. Instale o [Tokens Studio](https://tokens.studio/) no Figma
2. Configure a sincronização com GitHub:
   - Vá em Settings > Sync providers > Add new > GitHub
   - Repository: `seu-usuario/design-system-template`
   - Branch: `main`
   - File path: `tokens/tokens.json`
   - Gere um Personal Access Token com permissão `repo`

3. Ao salvar tokens no Figma, eles serão sincronizados automaticamente

### Fluxo de Sincronização

```
Designer atualiza tokens no Figma
           ↓
Tokens Studio faz push para GitHub
           ↓
GitHub Action dispara build de tokens
           ↓
Tokens compilados para CSS/JS
           ↓
CI roda testes e valida
           ↓
Release automático (se na main)
```

## Customização por Cliente

Veja o arquivo [CLIENT.md](./CLIENT.md) para instruções detalhadas de como personalizar este template para um cliente específico.

## Componentes Disponíveis

### Button

```tsx
import { Button } from '@seu-org/design-system';

<Button variant="primary" size="md">
  Clique aqui
</Button>
```

Variantes: `primary`, `secondary`, `outline`, `ghost`, `danger`
Tamanhos: `sm`, `md`, `lg`

### Input

```tsx
import { Input } from '@seu-org/design-system';

<Input
  label="Email"
  placeholder="seu@email.com"
  helperText="Nunca compartilharemos seu email"
/>
```

### Card

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@seu-org/design-system';

<Card>
  <CardHeader title="Título" subtitle="Subtítulo" />
  <CardContent>Conteúdo aqui</CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

## Tokens

Os tokens estão organizados em:

- **Primitivos**: Valores base (cores, números)
- **Semânticos**: Tokens contextuais (background, text, border)

### Usando tokens CSS

```css
.meu-componente {
  color: var(--color-semantic-text-primary);
  background: var(--color-semantic-background-secondary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

### Usando tokens JS

```ts
import { colorSemanticTextPrimary } from '@seu-org/design-system/tokens';
```

## CI/CD

O projeto inclui workflows para:

- **CI**: Build, lint e testes em cada PR
- **Release**: Publicação automática no GitHub Packages
- **Sync Tokens**: Rebuild automático quando tokens são atualizados
- **Visual Regression**: Testes visuais com Chromatic (opcional)

## Publicação

O package é publicado no GitHub Packages:

```bash
npm install @seu-org/design-system --registry=https://npm.pkg.github.com
```

Configure o `.npmrc` no projeto consumidor:

```
@seu-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Contribuindo

1. Crie uma branch: `git checkout -b feature/minha-feature`
2. Faça suas alterações
3. Rode os testes: `npm run test`
4. Commit: `git commit -m 'feat: adiciona nova feature'`
5. Push: `git push origin feature/minha-feature`
6. Abra um Pull Request

## Licença

MIT
