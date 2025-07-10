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

export default function EMICalculatorScreen() {
  const { theme, selectedThemeOption } = useTheme();
  const currency = useCurrency();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
    setError(
      "Failed to load EMI Calculator. Please check your internet connection."
    );
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ToolHeader
        title="EMI Calculator"
        icon="calculator"
        onRefresh={handleRefresh}
      />
      {error ? (
        <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          <Text style={[styles.retryText, { color: theme.colors.textSecondary }]}>Pull to refresh to try again</Text>
        </View>
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{
              uri: WEBVIEW_URLS.EMI_CALCULATOR,
              headers: WEBVIEW_HEADERS,
            }}
            style={styles.webview}
            onLoad={handleWebViewLoad}
            onError={handleWebViewError}
            onHttpError={handleWebViewError}
            onNavigationStateChange={handleNavigationStateChange}
            {...WEBVIEW_CONFIG}
            renderLoading={() => (
              <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.info} />
                <Text style={[styles.loadingText, { color: theme.colors.text }]}>
                  Loading EMI Calculator...
                </Text>
              </View>
            )}
          />

          {isLoading && (
            <View style={[styles.loadingOverlay, { backgroundColor: `${theme.colors.background}F0` }]}>
              <ActivityIndicator size="large" color={theme.colors.info} />
              <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading EMI Calculator...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: "center",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  retryText: {
    fontSize: 14,
    textAlign: "center",
  },
});
