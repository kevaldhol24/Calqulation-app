import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const SIP_CALCULATOR_URL = 'https://www.calqulation.com/tool/sip-calculator';

export default function SIPCalculatorScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  const handleWebViewError = () => {
    setIsLoading(false);
    setError('Failed to load SIP Calculator. Please check your internet connection.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText}>Pull to refresh to try again</Text>
        </View>
      ) : (
        <>
          <WebView
            source={{ uri: SIP_CALCULATOR_URL }}
            style={styles.webview}
            onLoad={handleWebViewLoad}
            onError={handleWebViewError}
            onHttpError={handleWebViewError}
            startInLoadingState={true}
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsBackForwardNavigationGestures={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading SIP Calculator...</Text>
              </View>
            )}
          />
          
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Loading SIP Calculator...</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
