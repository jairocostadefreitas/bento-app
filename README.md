# Bento Grid - Aplicação de Saúde e Bem-estar

Uma aplicação web moderna construída com Next.js, TypeScript e TailwindCSS, apresentando um layout inspirado no estilo Bento Grid para exibir conteúdo relacionado à saúde e bem-estar.

## 🚀 Funcionalidades

- **Layout Bento Grid Responsivo**
  - Cards de diferentes tamanhos e layouts
  - Adaptação automática para dispositivos móveis
  - Animações suaves na interação
  - Gradientes e efeitos visuais modernos

- **Sistema de Categorias**
  - Filtro dinâmico por categorias
  - Categorias: Fitness, Saúde e Bem-estar
  - Animações suaves na transição entre categorias

- **Cards Interativos**
  - Layout adaptativo baseado no conteúdo
  - Imagens com efeito de zoom no hover
  - Botões com feedback visual
  - Card de inscrição sempre visível

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** - Para animações
- **clsx/tailwind-merge** - Para gerenciamento de classes

## 📦 Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd bento-app
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Layout Responsivo

O projeto possui diferentes layouts baseados no tamanho da tela:

### Desktop
- Grid de 12 colunas
- Cards com tamanhos variados:
  - Card principal: 8 colunas
  - Card secundário: 4 colunas
  - Card terciário: 6 colunas
  - Cards menores: 3 colunas
- Layout horizontal para cards principais

### Mobile
- Grid de 2 colunas
- Layout vertical para todos os cards
- Imagens posicionadas acima do conteúdo
- Espaçamento otimizado para telas menores

## 🎨 Personalização

O projeto utiliza TailwindCSS para estilização, permitindo fácil personalização através do arquivo `tailwind.config.ts`.

### Cores Principais
- Rosa: `#E6007E`
- Verde: `#5CB85C`
- Verde-água: `#00BFA5`
- Azul escuro: `#1E4C9A`
- Azul claro: `#03A9F4`

## 📄 Estrutura do Projeto

```
bento-app/
├── app/
│   ├── components/
│   │   ├── bento-grid/
│   │   │   ├── BentoGrid.tsx
│   │   │   └── BentoItem.tsx
│   │   └── CategoryFilter.tsx
│   ├── types/
│   │   └── index.ts
│   ├── page.tsx
│   └── layout.tsx
├── public/
│   └── imagens/
└── package.json
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
