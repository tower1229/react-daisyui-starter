import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Theme type
export type Theme = 'light' | 'dark' | 'auto';

// Theme state interface
interface ThemeState {
  // 状态
  theme: Theme;
  systemTheme: 'light' | 'dark';

  // 操作
  setTheme: (theme: Theme) => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// Theme state management
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'auto',
      systemTheme: 'light',

      // Set theme
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme, get().systemTheme);
      },

      // Set system theme
      setSystemTheme: (systemTheme: 'light' | 'dark') => {
        set({ systemTheme });
        applyTheme(get().theme, systemTheme);
      },

      // Toggle theme
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Apply theme to DOM
function applyTheme(theme: Theme, systemTheme: 'light' | 'dark') {
  const actualTheme = theme === 'auto' ? systemTheme : theme;
  document.documentElement.setAttribute('data-theme', actualTheme);
}

// Initialize theme
export function initializeTheme() {
  const { theme, setSystemTheme } = useThemeStore.getState();

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    setSystemTheme(e.matches ? 'dark' : 'light');
  };

  // Set initial system theme
  setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

  // Listen for system theme changes
  mediaQuery.addEventListener('change', handleSystemThemeChange);

  // Apply current theme
  applyTheme(theme, mediaQuery.matches ? 'dark' : 'light');

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
}

// Selector functions
export const useTheme = () => useThemeStore((state) => state.theme);
export const useSystemTheme = () => useThemeStore((state) => state.systemTheme);
export const useThemeActions = () => ({
  setTheme: useThemeStore.getState().setTheme,
  toggleTheme: useThemeStore.getState().toggleTheme,
});

// Calculate current actual theme
export const useActualTheme = () =>
  useThemeStore((state) => (state.theme === 'auto' ? state.systemTheme : state.theme));
