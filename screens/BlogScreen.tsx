import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "../context/ThemeContext";
import { useCurrency } from "../context/CurrencyContext";
import {
  WEBVIEW_HEADERS,
  WEBVIEW_URLS,
  WEBVIEW_CONFIG,
} from "../constants/webview";
import { ToolHeader } from "../components/ToolHeader";
import { useWebViewBackNavigation } from "../hooks";
import { WebViewCookieInjector } from "../utils/webViewCookies";
import { createCurrencyCookieScript } from "../utils/currencyManager";
import { createThemeLocalStorageScript } from "../utils/themeManager";

export default function BlogScreen() {
  const { theme, selectedThemeOption } = useTheme();
  const currency = useCurrency();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Create styles based on current theme
  const styles = createStyles(theme);

  const { handleNavigationStateChange } = useWebViewBackNavigation(webViewRef);

  // Register WebView with cookie injector
  useEffect(() => {
    if (webViewRef.current) {
      WebViewCookieInjector.registerWebView(webViewRef.current);
    }

    return () => {
      if (webViewRef.current) {
        WebViewCookieInjector.unregisterWebView(webViewRef.current);
      }
    };
  }, []);

  const handleWebViewLoad = () => {
    setIsLoading(false);

    // Inject current currency cookie and theme on load
    if (webViewRef.current && !currency.isLoading) {
      const cookieScript = createCurrencyCookieScript(
        currency.selectedCurrency
      );
      webViewRef.current.injectJavaScript(cookieScript);
      
      // Also inject theme
      const themeScript = createThemeLocalStorageScript(selectedThemeOption);
      webViewRef.current.injectJavaScript(themeScript);
    }
  };

  const handleWebViewError = () => {
    setIsLoading(false);
    setError("Failed to load blog. Please check your internet connection.");
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      <ToolHeader
        title="Financial Blog"
        icon="library"
        onRefresh={handleRefresh}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText}>Pull to refresh to try again</Text>
        </View>
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{
              uri: WEBVIEW_URLS.BLOG,
              headers: WEBVIEW_HEADERS,
            }}
            style={styles.webview}
            onLoad={handleWebViewLoad}
            onError={handleWebViewError}
            onHttpError={handleWebViewError}
            onNavigationStateChange={handleNavigationStateChange}
            {...WEBVIEW_CONFIG}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading Blog...</Text>
              </View>
            )}
          />

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Loading Blog...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background + 'F0',
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  retryText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
