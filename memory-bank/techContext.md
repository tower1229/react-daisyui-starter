# σ₃: Technical Context

_v1.0 | Created: 2024-12-29 | Updated: 2024-12-29_
_Π: DEVELOPMENT | Ω: EXECUTE_

## 🛠️ Technology Stack

### Frontend Framework

- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.8.3** - Static type checking
- **Vite 7.1.2** - Fast build tool and dev server

### UI & Styling

- **DaisyUI 5.0.50** - Component library built on Tailwind
- **Tailwind CSS 4.1.11** - Utility-first CSS framework with Vite integration
- **@tailwindcss/vite 4.1.11** - Native Vite plugin for Tailwind CSS v4

### State Management

- **Zustand 5.0.7** - Lightweight state management
- **Immer 10.1.1** - Immutable state updates
- **@tanstack/react-query 5.84.1** - Server state management

### Routing

- **@tanstack/react-router 1.130.12** - Type-safe routing
- **@tanstack/router-cli 1.130.15** - Route generation
- **@tanstack/router-vite-plugin 1.130.15** - Vite integration

### Development Tools

- **ESLint 9.30.1** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **lint-staged 16.1.4** - Pre-commit linting

### Icons & UI Elements

- **Lucide React 0.537.0** - Icon library
- **React Hot Toast 2.5.2** - Toast notifications

## 🔧 Build Configuration

### Vite Configuration

- React plugin for JSX support
- SVGR plugin for SVG imports
- Tailwind CSS integration
- Hash-based routing

### TypeScript Configuration

- Strict mode enabled
- Modern ES features
- React 19 JSX transform
- Path mapping for clean imports

### Tailwind Configuration

- DaisyUI plugin integration via CSS imports
- Custom color schemes and themes
- Responsive breakpoints
- Component variants
- Native Vite integration (no PostCSS required)

## 🌐 Development Environment

### Node.js Requirements

- **Node.js** 18+ (recommended 20+)
- **Yarn** package manager
- **Git** for version control

### Development Scripts

- `yarn dev` - Start development server
- `yarn build` - Production build
- `yarn lint` - Code linting
- `yarn format` - Code formatting
- `yarn type-check` - TypeScript validation

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox
- CSS Custom Properties

## 📦 Package Management

### Dependencies

- **Production**: React, DaisyUI, TanStack, Zustand
- **Development**: TypeScript, ESLint, Prettier, Vite
- **Peer Dependencies**: None

### Version Strategy

- **React**: Latest stable (19.x)
- **TypeScript**: Latest stable (5.x)
- **Build Tools**: Latest stable (Vite 7.x)
- **UI Libraries**: Latest stable (DaisyUI 5.x)
