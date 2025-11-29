# Guia de Customização por Cliente

Este documento explica como adaptar o Design System Template para um cliente específico.

## Passo a Passo

### 1. Fork/Clone do Template

```bash
# Clone o template com um novo nome
git clone https://github.com/seu-usuario/design-system-template.git ds-cliente-acme
cd ds-cliente-acme

# Remova o origin original
git remote remove origin

# Adicione o novo repositório
git remote add origin https://github.com/seu-usuario/ds-cliente-acme.git
```

### 2. Atualize o package.json

Edite o `package.json` com as informações do cliente:

```json
{
  "name": "@sua-org/ds-cliente-acme",
  "description": "Design System do Cliente ACME",
  "repository": {
    "url": "git+https://github.com/sua-org/ds-cliente-acme.git"
  }
}
```

### 3. Configure a Sincronização com Figma

#### 3.1 Crie um arquivo Figma para o cliente

1. Crie um novo arquivo no Figma para o cliente
2. Instale o plugin [Tokens Studio](https://tokens.studio/)

#### 3.2 Configure os Tokens Iniciais

No Tokens Studio, importe os tokens base do template ou crie novos:

**Cores da Marca:**
```json
{
  "color": {
    "primitive": {
      "brand": {
        "50": { "$value": "#cor-clara", "$type": "color" },
        "500": { "$value": "#cor-principal", "$type": "color" },
        "900": { "$value": "#cor-escura", "$type": "color" }
      }
    }
  }
}
```

#### 3.3 Configure a Sincronização com GitHub

No Tokens Studio:
1. Settings > Sync providers > Add new > GitHub
2. Configure:
   - **Name**: Cliente ACME
   - **Personal Access Token**: Token com permissão `repo`
   - **Repository**: `sua-org/ds-cliente-acme`
   - **Branch**: `main`
   - **File path**: `tokens/tokens.json`

### 4. Customize os Tokens

Os tokens mais comuns para customizar por cliente:

#### Cores

```json
{
  "color": {
    "primitive": {
      "brand": {
        "500": { "$value": "#FF5733", "$type": "color" }
      }
    }
  }
}
```

#### Tipografia

```json
{
  "typography": {
    "fontFamily": {
      "sans": {
        "$value": "Poppins, sans-serif",
        "$type": "fontFamily"
      }
    }
  }
}
```

#### Border Radius

```json
{
  "borderRadius": {
    "md": { "$value": "16px", "$type": "dimension" }
  }
}
```

### 5. Customize Componentes (se necessário)

Se o cliente precisar de comportamentos diferentes:

#### 5.1 Modificar um componente existente

```tsx
// src/components/Button/Button.tsx

// Adicione uma variante específica do cliente
export type ButtonVariant = 'primary' | 'secondary' | 'brand-special';
```

#### 5.2 Adicionar um componente novo

```bash
mkdir src/components/ClienteFeature
```

```tsx
// src/components/ClienteFeature/ClienteFeature.tsx
import styles from './ClienteFeature.module.css';

export const ClienteFeature = () => {
  return <div className={styles.feature}>...</div>;
};
```

### 6. Configure Secrets do GitHub

No repositório do cliente, adicione os seguintes secrets:

| Secret | Descrição |
|--------|-----------|
| `CHROMATIC_PROJECT_TOKEN` | Token do Chromatic (opcional, para visual testing) |

O `GITHUB_TOKEN` já é fornecido automaticamente.

### 7. Primeiro Deploy

```bash
# Instale dependências
npm install

# Build tokens
npm run build:tokens

# Teste localmente
npm run dev

# Commit inicial
git add .
git commit -m "feat: setup inicial do DS Cliente ACME"
git push -u origin main
```

### 8. Publicação

Após o push para `main`, o GitHub Action irá:

1. Rodar testes
2. Buildar a biblioteca
3. Publicar no GitHub Packages como `@sua-org/ds-cliente-acme`

## Estrutura de Tokens Recomendada

```
tokens/
├── tokens.json           # Tokens principais
└── $themes.json          # Configuração de temas (light/dark)
```

### Hierarquia de Tokens

```
Primitivos (valores base)
    ↓
Semânticos (contexto)
    ↓
Componentes (uso específico)
```

Exemplo:

```
color.primitive.blue.500 = "#3B82F6"
         ↓
color.semantic.interactive.primary = "{color.primitive.blue.500}"
         ↓
button.background.primary = "{color.semantic.interactive.primary}"
```

## Checklist de Customização

- [ ] Atualizar `package.json` com nome do cliente
- [ ] Configurar Tokens Studio no Figma do cliente
- [ ] Customizar cores da marca
- [ ] Customizar tipografia (se aplicável)
- [ ] Ajustar border-radius (se aplicável)
- [ ] Adicionar/modificar componentes específicos
- [ ] Testar todos os componentes no Storybook
- [ ] Verificar acessibilidade (contraste, ARIA)
- [ ] Configurar secrets no GitHub
- [ ] Fazer primeiro deploy
- [ ] Documentar particularidades do cliente

## Suporte Multi-tema (Light/Dark)

Para suportar tema escuro:

### 1. Crie tokens para o tema dark

No Tokens Studio, crie um novo set `tokens-dark` com overrides:

```json
{
  "color": {
    "semantic": {
      "background": {
        "primary": { "$value": "{color.primitive.gray.900}" }
      },
      "text": {
        "primary": { "$value": "{color.primitive.white}" }
      }
    }
  }
}
```

### 2. Configure temas

No `$themes.json`:

```json
[
  {
    "id": "light",
    "name": "Light",
    "selectedTokenSets": {
      "tokens": "enabled"
    }
  },
  {
    "id": "dark",
    "name": "Dark",
    "selectedTokenSets": {
      "tokens": "enabled",
      "tokens-dark": "enabled"
    }
  }
]
```

### 3. Atualize o build de tokens

O script `build-tokens.ts` irá gerar arquivos separados para cada tema.

## FAQ

### Como atualizar o template base?

Se o template base receber atualizações importantes:

```bash
# Adicione o template como remote
git remote add template https://github.com/seu-usuario/design-system-template.git

# Fetch as mudanças
git fetch template

# Merge seletivo (cuidado com conflitos)
git merge template/main --allow-unrelated-histories
```

### Como sincronizar tokens manualmente?

Se a sincronização automática falhar:

```bash
npm run build:tokens
git add src/tokens/
git commit -m "build: update tokens"
git push
```

### Como testar antes de publicar?

```bash
# Build local
npm run build

# Link local para teste
npm link

# No projeto consumidor
npm link @sua-org/ds-cliente-acme
```
