# Tokens - Sincronização com Figma

Este diretório contém os Design Tokens sincronizados com o Figma via **Tokens Studio**.

## Configuração do Tokens Studio

### 1. Instalar o Plugin
- Abra o Figma
- Vá em Plugins > Tokens Studio for Figma
- Instale o plugin

### 2. Configurar Sincronização com GitHub
1. No Tokens Studio, clique em **Settings** (engrenagem)
2. Em **Sync**, selecione **GitHub**
3. Configure:
   - **Personal Access Token**: Gere um token em github.com/settings/tokens com permissões `repo`
   - **Repository**: `seu-usuario/design-system-template`
   - **Branch**: `main`
   - **File Path**: `tokens/tokens.json`

### 3. Fluxo de Trabalho

```
Designer atualiza tokens no Figma
          ↓
Tokens Studio sincroniza com GitHub
          ↓
GitHub Action dispara build
          ↓
Tokens são compilados para CSS/JS
          ↓
Nova versão é publicada
```

## Estrutura de Tokens

```
tokens.json
├── color
│   ├── primitive     # Cores base (gray, brand, success, etc.)
│   └── semantic      # Cores semânticas (background, text, border)
├── spacing           # Espaçamentos (0-24)
├── sizing            # Tamanhos
├── borderRadius      # Raios de borda
├── borderWidth       # Larguras de borda
├── typography        # Tipografia (fontFamily, fontSize, etc.)
├── shadow            # Sombras
├── motion            # Animações (duration, easing)
└── zIndex            # Camadas z-index
```

## Convenções de Nomenclatura

- **Primitivos**: Valores puros (ex: `color.primitive.brand.500`)
- **Semânticos**: Referências contextuais (ex: `color.semantic.text.primary`)
- Use semânticos nos componentes, primitivos são internos

## Adicionando Novos Tokens

1. Adicione no Figma via Tokens Studio
2. Siga a estrutura existente
3. Use referências quando possível: `{color.primitive.brand.500}`
4. Sincronize com GitHub
5. O CI fará o build automaticamente
