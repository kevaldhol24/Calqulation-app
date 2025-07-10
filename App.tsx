import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AppNavigator from "./navigation/AppNavigator";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SafeAreaWrapper } from "./components";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Create a themed splash screen component
const ThemedSplashScreen = () => {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.splashContainer}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.splashContent}>
        <Text style={styles.splashText}>Calqulation</Text>
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.splashLoader}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

// Main app content that uses theme
const AppContent = () => {
  const { theme, isLoading } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // For now, just simulate a short loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || isLoading) {
    return (
      <SafeAreaWrapper>
        <ThemedSplashScreen />
      </SafeAreaWrapper>
    );
  }

  return (
    <CurrencyProvider>
      <SafeAreaWrapper
        style={{ backgroundColor: theme.colors.background }}
        onLayout={onLayoutRootView}
      >
        <StatusBar style="light" />
        <AppNavigator />
      </SafeAreaWrapper>
    </CurrencyProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  splashLoader: {
    marginTop: 20,
  },
});
