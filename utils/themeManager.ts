import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeOption {
  mode: ThemeMode;
  label: string;
  description: string;
}

export const themeOptions: ThemeOption[] = [
  {
    mode: 'system',
    label: 'System',
    description: 'Follow system theme'
  },
  {
    mode: 'light',
    label: 'Light',
    description: 'Always use light theme'
  },
  {
    mode: 'dark',
    label: 'Dark',
    description: 'Always use dark theme'
  }
];

const THEME_STORAGE_KEY = '@theme_preference';

/**
 * Get the default theme (system)
 */
export const getDefaultTheme = (): ThemeOption => {
  return themeOptions[0]; // system
};

/**
 * Get the current system theme
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
};

/**
 * Resolve the actual theme to apply based on the mode
 */
export const resolveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode;
};

/**
 * Theme utility functions
 */
export const themeUtils = {
  /**
   * Store theme preference
   */
  storeTheme: async (theme: ThemeOption): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('Error storing theme preference:', error);
      throw error;
    }
  },

  /**
   * Get stored theme preference
   */
  getStoredTheme: async (): Promise<ThemeOption> => {
    try {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate that the stored theme is still valid
        const validTheme = themeOptions.find(option => option.mode === parsed.mode);
        if (validTheme) {
          return validTheme;
        }
      }
    } catch (error) {
      console.error('Error retrieving stored theme:', error);
    }
    
    return getDefaultTheme();
  },

  /**
   * Clear stored theme preference
   */
  clearStoredTheme: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing stored theme:', error);
      throw error;
    }
  }
};

/**
 * Create JavaScript to inject theme into WebView localStorage
 */
export const createThemeLocalStorageScript = (theme: ThemeOption): string => {
  const resolvedTheme = resolveTheme(theme.mode);
  
  return `
    (function() {
      try {
        // Set theme in localStorage
        localStorage.setItem('theme', '${theme.mode}');
        
        // Also set the resolved theme for immediate use
        localStorage.setItem('resolvedTheme', '${resolvedTheme}');
        
        // Dispatch a custom event to notify the website of theme change
        window.dispatchEvent(new CustomEvent('themeChanged', {
          detail: {
            mode: '${theme.mode}',
            resolvedTheme: '${resolvedTheme}'
          }
        }));
        
        console.log("Theme set in localStorage:", '${theme.mode}', "resolved to:", '${resolvedTheme}');
        
        // Try to apply theme immediately if the website supports it
        if (typeof window.applyTheme === 'function') {
          window.applyTheme('${resolvedTheme}');
        }
        
        // Also try common theme application methods
        if (document.documentElement) {
          document.documentElement.setAttribute('data-theme', '${resolvedTheme}');
          document.documentElement.classList.remove('light-theme', 'dark-theme');
          document.documentElement.classList.add('${resolvedTheme}-theme');
        }
        
      } catch (error) {
        console.error("Error setting theme in localStorage:", error);
      }
    })();
  `;
};

/**
 * Create script to get current theme from localStorage
 */
export const createGetThemeScript = (): string => {
  return `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'system';
        const resolvedTheme = localStorage.getItem('resolvedTheme') || 'light';
        return { theme, resolvedTheme };
      } catch (error) {
        console.error("Error getting theme from localStorage:", error);
        return { theme: 'system', resolvedTheme: 'light' };
      }
    })();
  `;
};
