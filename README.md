# 🚀 React DaisyUI Starter

> **A modern, production-ready React starter template with DaisyUI, TypeScript, and TanStack Router**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.50-5A0EF8?style=for-the-badge&logo=daisyui)](https://daisyui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<div align="center">

![React DaisyUI Starter](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![Code Quality](https://img.shields.io/badge/Quality-A%2B-brightgreen?style=for-the-badge)

</div>

---

## ✨ Features

### 🎯 **Modern React Stack**

- **React 19** with latest concurrent features and hooks
- **TypeScript 5.8** for type safety and developer experience
- **Vite 7** for lightning-fast development and building

### 🎨 **Beautiful UI Components**

- **DaisyUI 5** - The most popular component library for Tailwind CSS
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Responsive Design** - Mobile-first approach

### 🚀 **Production-Ready Architecture**

- **TanStack Router** - Type-safe routing with file-based routing
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **Immer** - Immutable state updates

### 🔐 **Authentication & Security**

- **JWT-based authentication** with secure token storage
- **Protected routes** with authentication guards
- **Automatic token refresh** and validation
- **Persistent login state** across sessions

### 🌓 **Theme System**

- **Light/Dark mode** with system preference detection
- **Auto theme switching** based on OS settings
- **Persistent theme preferences** in localStorage
- **Smooth theme transitions**

### 🛠️ **Developer Experience**

- **ESLint + Prettier** for code quality
- **Husky + lint-staged** for pre-commit hooks
- **Hot reload** with Vite
- **Type checking** with TypeScript
- **Path aliases** for clean imports

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended 20+)
- **Yarn** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-daisyui-starter.git
cd react-daisyui-starter

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build

# Code Quality
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn format       # Format code with Prettier
yarn type-check   # Run TypeScript type checking

# Git Hooks
yarn prepare      # Setup Husky hooks
```

---

## 🏗️ Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable UI components
│   ├── layouts/     # Layout components
│   └── ui/          # UI components
├── constants/        # Application constants
├── hooks/            # Custom React hooks
├── routes/           # Route components (file-based routing)
├── stores/           # Zustand state stores
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Key Files

- **`src/main.tsx`** - Application entry point
- **`src/routes/`** - File-based routing with TanStack Router
- **`src/stores/authStore.ts`** - Authentication state management
- **`src/stores/themeStore.ts`** - Theme switching functionality
- **`src/components/layouts/`** - Layout components for different pages

---

## 🎨 Component Examples

### Theme Toggle

```tsx
import { useThemeActions } from "@/stores/themeStore";

function ThemeToggle() {
  const { toggleTheme } = useThemeActions();

  return (
    <button onClick={toggleTheme} className="btn btn-ghost">
      🌓 Toggle Theme
    </button>
  );
}
```

### Protected Route

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardPage,
});
```

### API Client Usage

```tsx
import { apiClient } from "@/api";

// GET request
const users = await apiClient.get<User[]>("/users");

// POST request
const newUser = await apiClient.post<User>("/users", {
  name: "John Doe",
  email: "john@example.com",
});
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_APP_HOST=http://localhost:3000
VITE_APP_TITLE=React DaisyUI Starter
```

### Tailwind CSS

The project includes a pre-configured `tailwind.config.js` with DaisyUI plugin:

```js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
```

### TypeScript

Strict TypeScript configuration with path aliases:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 🚀 Deployment

### Build for Production

```bash
# Build the application
yarn build

# Preview the build
yarn preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
yarn build

# Deploy the dist folder to Netlify
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Write meaningful commit messages
- Ensure all tests pass

---

## 📚 Documentation

- **[React Documentation](https://react.dev/)** - Learn React
- **[DaisyUI Documentation](https://daisyui.com/)** - UI Components
- **[TanStack Router](https://tanstack.com/router)** - Routing
- **[Zustand](https://github.com/pmndrs/zustand)** - State Management
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS Framework

---

## 🎯 Roadmap

- [ ] **Advanced Authentication** - OAuth, 2FA support
- [ ] **Internationalization** - i18n with react-i18next
- [ ] **Testing Suite** - Jest + React Testing Library
- [ ] **Storybook** - Component documentation
- [ ] **PWA Support** - Service worker and offline capabilities
- [ ] **Performance Monitoring** - Bundle analysis and metrics

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **DaisyUI Team** for the beautiful components
- **TanStack Team** for the excellent routing solution
- **Vite Team** for the fast build tool
- **Tailwind CSS Team** for the utility-first CSS framework

---

<div align="center">

**Made with ❤️ by the React DaisyUI Starter Team**

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/react-daisyui-starter?style=social)](https://github.com/yourusername/react-daisyui-starter)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/react-daisyui-starter?style=social)](https://github.com/yourusername/react-daisyui-starter)
[![GitHub Issues](https://img.shields.io/github/issues/yourusername/react-daisyui-starter)](https://github.com/yourusername/react-daisyui-starter/issues)

</div>
