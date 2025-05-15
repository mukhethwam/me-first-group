
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default to light theme when SSR or no window object
const getDefaultTheme = (): Theme => {
  try {
    // Safely check for window to avoid SSR issues
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        return savedTheme;
      }
      
      // Use system preference as fallback
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
  } catch (e) {
    console.error("Error detecting theme:", e);
  }
  
  // Final fallback - always return light theme to ensure something displays
  return 'light';
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with light theme to prevent hydration mismatch
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  
  // Once mounted, load the saved theme
  useEffect(() => {
    setMounted(true);
    try {
      setTheme(getDefaultTheme());
    } catch (e) {
      console.error("Error setting theme:", e);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (!mounted) return;
    
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
    } catch (e) {
      console.error("Error saving theme:", e);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      if (typeof window === 'undefined') return;
      
      const root = window.document.documentElement;
      
      // First remove all theme classes
      root.classList.remove('light', 'dark');
      
      // Apply the appropriate theme
      if (theme === 'system') {
        const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    } catch (e) {
      console.error("Error applying theme:", e);
      
      // If there's an error, at least try to apply light theme
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('light');
      }
    }
  }, [theme, mounted]);

  // Providing a stable context value
  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.warn('useTheme must be used within a ThemeProvider');
    // Return a default value to prevent app crashes
    return { theme: 'light', setTheme: () => {} };
  }
  return context;
};
