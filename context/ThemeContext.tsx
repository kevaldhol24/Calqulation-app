import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from "react";
import { Appearance } from "react-native";
import {
  ThemeOption,
  themeUtils,
  getDefaultTheme,
  createThemeLocalStorageScript,
  resolveTheme,
  getSystemTheme,
} from "../utils/themeManager";
import { WebViewCookieInjector } from "../utils/webViewCookies";

export const lightTheme = {
  colors: {
    primary: "#6e11b0",
    secondary: "#1c398e",
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#333333",
    textSecondary: "#666666",
    textLight: "#888888",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#FF6B6B",
    info: "#2196F3",
    border: "#e0e0e0",
    shadow: "#000000",
  },
  gradients: {
    primary: ["#6e11b0", "#1c398e"],
    primaryLight: ["#6e11b020", "#1c398e20"],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 28,
    massive: 32,
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "bold",
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export const darkTheme = {
  colors: {
    primary: "#8e44d1",
    secondary: "#4a6bd4",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#b3b3b3",
    textLight: "#808080",
    success: "#66bb6a",
    warning: "#ffa726",
    error: "#ef5350",
    info: "#42a5f5",
    border: "#333333",
    shadow: "#000000",
  },
  gradients: {
    primary: ["#8e44d1", "#4a6bd4"],
    primaryLight: ["#8e44d130", "#4a6bd430"],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 28,
    massive: 32,
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "bold",
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export type ThemeType = typeof lightTheme;

interface ThemeContextType {
  theme: ThemeType;
  selectedThemeOption: ThemeOption;
  isDark: boolean;
  isLoading: boolean;
  setTheme: (themeOption: ThemeOption) => Promise<void>;
  initializeTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [selectedThemeOption, setSelectedThemeOption] = useState<ThemeOption>(getDefaultTheme());
  const [isLoading, setIsLoading] = useState(true);

  // Determine current theme based on selection and system preference
  const getCurrentTheme = (themeOption: ThemeOption): ThemeType => {
    const resolvedTheme = resolveTheme(themeOption.mode);
    return resolvedTheme === 'dark' ? darkTheme : lightTheme;
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(getCurrentTheme(selectedThemeOption));
  const isDark = resolveTheme(selectedThemeOption.mode) === 'dark';

  const initializeTheme = async () => {
    try {
      setIsLoading(true);
      const storedTheme = await themeUtils.getStoredTheme();
      console.log("Theme Context: Initializing with stored theme:", storedTheme);
      setSelectedThemeOption(storedTheme);
      setCurrentTheme(getCurrentTheme(storedTheme));

      // Inject the theme into any already-registered WebViews
      const themeScript = createThemeLocalStorageScript(storedTheme);
      WebViewCookieInjector.injectIntoAllWebViews(themeScript);
      console.log("Theme Context: Theme injected into WebViews");
    } catch (error) {
      console.error("Error initializing theme:", error);
      setSelectedThemeOption(getDefaultTheme());
      setCurrentTheme(lightTheme);
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = async (themeOption: ThemeOption) => {
    try {
      console.log("Theme Context: Setting theme to:", themeOption);
      
      // Store the theme preference first
      await themeUtils.storeTheme(themeOption);
      
      // Update state
      setSelectedThemeOption(themeOption);
      const newTheme = getCurrentTheme(themeOption);
      setCurrentTheme(newTheme);

      // Create and inject the theme script into all WebViews and reload them
      const themeScript = createThemeLocalStorageScript(themeOption);
      WebViewCookieInjector.injectIntoAllWebViewsAndReload(themeScript);

      console.log("Theme updated successfully to:", themeOption.mode);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  // Listen for system theme changes when using system theme
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (selectedThemeOption.mode === 'system') {
        console.log("Theme Context: System theme changed to:", colorScheme);
        const newTheme = getCurrentTheme(selectedThemeOption);
        setCurrentTheme(newTheme);
        
        // Update WebView when system theme changes
        const themeScript = createThemeLocalStorageScript(selectedThemeOption);
        WebViewCookieInjector.injectIntoAllWebViews(themeScript);
      }
    });

    return () => subscription?.remove();
  }, [selectedThemeOption]);

  // Update current theme whenever selectedThemeOption changes
  useEffect(() => {
    const newTheme = getCurrentTheme(selectedThemeOption);
    setCurrentTheme(newTheme);
    console.log("Theme Context: Updated current theme for option:", selectedThemeOption);
  }, [selectedThemeOption]);

  useEffect(() => {
    initializeTheme();
  }, []);

  const value: ThemeContextType = {
    theme: currentTheme,
    selectedThemeOption,
    isDark,
    isLoading,
    setTheme,
    initializeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
