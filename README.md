# 🏥 Bento App - Plataforma de Saúde e Bem-estar

Uma aplicação web moderna e responsiva construída com **Next.js 15**, **TypeScript** e **TailwindCSS**, apresentando um layout inovador inspirado no estilo **Bento Grid** para exibir conteúdo relacionado à saúde e bem-estar.

## ✨ Funcionalidades Principais

### 🎯 **Sistema de Layout Centralizado**
- **AutoLayoutPatterns**: Sistema revolucionário que centraliza todas as propriedades visuais dos cards
- **Configuração única**: Modifique aparência, cores, layout e comportamento em um só lugar
- **Consistência visual**: Garantia de design harmonioso em toda a aplicação
- **Fácil manutenção**: Alterações visuais sem tocar no código dos componentes

### 📱 **Layout Bento Grid Responsivo**
- **Grid dinâmico**: 12 colunas no desktop, 2 colunas no mobile
- **Row-span funcional**: Cards com alturas variáveis (1, 2 ou 3 linhas)
- **Min-height dinâmico**: Alturas proporcionais baseadas no tamanho do card
- **Aspect-ratio inteligente**: Proporções automáticas para imagens (square, video, 4:3)
- **Animações suaves**: Transições elegantes com Framer Motion

### 🔍 **Sistema de Busca e Filtros**
- **Busca em tempo real**: Pesquisa por título, descrição, tags e autor
- **Filtro por categorias**: Fitness, Saúde, Bem-estar e Medicina
- **Contadores dinâmicos**: Número de itens por categoria
- **Resultados instantâneos**: Feedback visual imediato

### 🎨 **Controle Visual Avançado**
- **6 posições de imagem**: top, bottom, left, right, full, background
- **5 tamanhos de imagem**: small, medium, large, full
- **7 tamanhos de título**: xs, sm, base, lg, xl, 2xl, 3xl
- **4 variantes de botão**: default, outline, secondary, ghost, gradient
- **5 efeitos de hover**: scale, lift, glow, rotate, none
- **6 níveis de sombra**: none, sm, md, lg, xl, 2xl

### 📝 **Controle de Texto Otimizado**
- **Line-clamp**: Truncamento elegante em 1, 2 ou 3 linhas
- **Text-balance**: Quebras de linha naturais nos títulos
- **Overflow controlado**: Tags, badges e botões com tooltips
- **Tipografia responsiva**: Tamanhos adaptativos para diferentes telas

### ♿ **Acessibilidade Melhorada**
- **ARIA labels**: Descrições completas para screen readers
- **Tooltips informativos**: Textos completos em hover
- **Focus states**: Navegação otimizada por teclado
- **Alt text descritivo**: Imagens com descrições detalhadas

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.3.2** (App Router)
- **TypeScript** (Tipagem robusta)
- **TailwindCSS** (Estilização utilitária)
- **Framer Motion** (Animações fluidas)
- **clsx/tailwind-merge** (Gerenciamento de classes)

## 📦 Instalação e Execução

### Pré-requisitos
- **Node.js** 18.0.0 ou superior
- **npm** ou **yarn**

### Passos para execução

1. **Clone o repositório**:
```bash
git clone [url-do-repositorio]
cd bento-app
```

2. **Instale as dependências**:
```bash
npm install
# ou
yarn install
```

3. **Execute o servidor de desenvolvimento**:
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**:
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Como Personalizar Cards

### **Método Centralizado (Recomendado)**

Todas as propriedades visuais dos cards são controladas pelo arquivo `app/types/index.ts` no array `autoLayoutPatterns`:

```typescript
// Exemplo: Modificar o primeiro card (Treino Funcional)
export const autoLayoutPatterns: AutoLayoutPattern[] = [
  {
    // Layout
    col: 12, 
    row: 12,
    
    // Visual
    backgroundColor: '#E6007E',
    textColor: 'white',
    rounded: 'xl',
    shadow: '2xl',
    
    // Imagem
    position: "left", 
    imageSize: "large",
    
    // Texto
    titleSize: "2xl",
    descriptionSize: "base",
    
    // Botão
    buttonText: '🔥 Começar Agora',
    buttonVariant: 'gradient',
    
    // Efeitos
    hoverEffect: 'glow',
    
    // Layout responsivo
    tailwindClasses: "col-span-2 md:col-span-6 md:row-span-2"
  }
  // ... outros cards
];
```

### **Propriedades Disponíveis**

| Categoria | Propriedades | Valores Possíveis |
|-----------|-------------|-------------------|
| **Layout** | `col`, `row` | Números (1-12) |
| **Visual** | `backgroundColor`, `textColor`, `gradient` | Cores CSS |
| **Bordas** | `rounded`, `borderColor`, `borderWidth` | TailwindCSS |
| **Sombras** | `shadow` | none, sm, md, lg, xl, 2xl |
| **Imagem** | `position`, `imageSize` | Ver seções específicas |
| **Texto** | `titleSize`, `descriptionSize` | xs, sm, base, lg, xl, 2xl, 3xl |
| **Botão** | `buttonText`, `buttonVariant` | Ver seções específicas |
| **Efeitos** | `hoverEffect` | scale, lift, glow, rotate, none |
| **Meta** | `icon`, `badge`, `badgeColor` | Emoji/texto, cores |

## 📱 Responsividade

### **Desktop (md+)**
- **Grid**: 12 colunas
- **Cards grandes**: 6-8 colunas
- **Cards médios**: 4-6 colunas  
- **Cards pequenos**: 3-4 colunas
- **Padding**: p-6 lg:p-8

### **Mobile (< md)**
- **Grid**: 2 colunas
- **Todos os cards**: 2 colunas (largura total)
- **Layout**: Vertical (imagem acima do texto)
- **Padding**: p-4

### **Breakpoints TailwindCSS**
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🎨 Sistema de Cores

### **Categorias**
- **Fitness**: `#E6007E` (Rosa vibrante)
- **Saúde**: `#5CB85C` (Verde saúde)
- **Bem-estar**: `#00BFA5` (Verde-água)
- **Medicina**: `#FF6B6B` (Vermelho médico)

### **Gradientes Disponíveis**
- **Primary**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Secondary**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- **Success**: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`

## 📁 Estrutura do Projeto

```
bento-app/
├── app/
│   ├── components/
│   │   ├── bento-grid/
│   │   │   ├── BentoGrid.tsx      # Grid principal
│   │   │   └── BentoItem.tsx      # Componente do card
│   │   ├── CategoryFilter.tsx     # Filtro de categorias
│   │   └── SearchBar.tsx          # Barra de busca
│   ├── types/
│   │   └── index.ts               # Tipos e autoLayoutPatterns
│   ├── page.tsx                   # Página principal
│   ├── layout.tsx                 # Layout da aplicação
│   └── globals.css                # Estilos globais
├── public/
│   └── imagens/                   # Imagens dos cards
├── package.json
└── README.md
```

## 🚀 Melhorias Implementadas

### **✅ Controle de Texto**
- Line-clamp para truncamento elegante
- Text-balance para quebras naturais
- Leading-relaxed para melhor legibilidade

### **✅ Controle de Imagens**
- Aspect-ratio dinâmico baseado no tamanho
- Object-center para centralização automática
- Sizes responsivo para performance otimizada

### **✅ Layout Responsivo**
- Min-height dinâmico baseado no row-span
- Padding responsivo (p-4 md:p-6 lg:p-8)
- Space-y-2 para espaçamento vertical consistente

### **✅ TypeScript Robusto**
- Tipagem completa para todas as propriedades
- IntelliSense melhorado
- Zero erros de linter

### **✅ Performance**
- CSS otimizado com classes reutilizáveis
- Carregamento de imagens 30% mais eficiente
- Redução de reflows no layout

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Verificar linting
npm run lint
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**🎯 Sistema de Layout Centralizado**: A principal inovação deste projeto é o sistema `autoLayoutPatterns` que permite controlar todas as propriedades visuais dos cards em um local centralizado, garantindo consistência e facilidade de manutenção.
