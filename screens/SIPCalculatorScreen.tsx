import React, { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../context/ThemeContext';
import { WEBVIEW_HEADERS, WEBVIEW_URLS, WEBVIEW_CONFIG } from '../constants/webview';
import { ToolHeader } from '../components/ToolHeader';
import { useWebViewBackNavigation } from '../hooks';

export default function SIPCalculatorScreen() {
  const theme = useTheme();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { handleNavigationStateChange } = useWebViewBackNavigation(webViewRef);

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  const handleWebViewError = () => {
    setIsLoading(false);
    setError('Failed to load SIP Calculator. Please check your internet connection.');
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      <ToolHeader 
        title="SIP Calculator" 
        icon="trending-up" 
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
              uri: WEBVIEW_URLS.SIP_CALCULATOR,
              headers: WEBVIEW_HEADERS
            }}
            style={styles.webview}
            onLoad={handleWebViewLoad}
            onError={handleWebViewError}
            onHttpError={handleWebViewError}
            onNavigationStateChange={handleNavigationStateChange}
            {...WEBVIEW_CONFIG}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.success} />
                <Text style={styles.loadingText}>Loading SIP Calculator...</Text>
              </View>
            )}
          />
          
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.success} />
              <Text style={styles.loadingText}>Loading SIP Calculator...</Text>
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
    backgroundColor: '#fafbff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  retryText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
});
