# σ₂: System Patterns

_v1.0 | Created: 2024-12-29 | Updated: 2024-12-29_
_Π: INITIALIZING | Ω: RESEARCH_

## 🏛️ Architecture Overview

### Frontend Architecture

- **React 19** with modern hooks and concurrent features
- **TypeScript** for type safety and developer experience
- **Component-based architecture** with clear separation of concerns
- **Store-based state management** using Zustand
- **Route-based code splitting** with TanStack Router

### State Management Pattern

- **Zustand stores** for global state (auth, theme)
- **React Query** for server state and caching
- **Local component state** for UI-specific state
- **Immutable updates** using Immer

### Routing Pattern

- **File-based routing** with TanStack Router
- **Protected routes** with authentication guards
- **Hash-based routing** for SPA compatibility
- **Lazy loading** for route components

## 🧩 Component Architecture

### Layout Components

- `MainLayout` - Base layout for public pages
- `DashboardLayout` - Protected layout for authenticated users

### UI Components

- `Header` - Navigation and user menu
- `UserMenu` - User authentication controls
- DaisyUI components for consistent styling

### Route Components

- `index` - Landing page
- `login` - Authentication page
- `dashboard` - Protected dashboard area

## 🔐 Authentication Pattern

- **Token-based authentication** stored in Zustand
- **Route guards** for protected content
- **Automatic token refresh** and validation
- **Persistent login state** across sessions

## 🎨 Theming Pattern

- **CSS custom properties** for theme variables
- **DaisyUI theme switching** (light/dark)
- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach

## 📁 File Organization

```
src/
├── api/          # API client and endpoints
├── components/   # Reusable UI components
├── constants/    # Application constants
├── hooks/        # Custom React hooks
├── routes/       # Route components
├── stores/       # Zustand state stores
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```
