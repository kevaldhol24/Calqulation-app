/**
 * WebView Cookie Injection Utilities
 * 
 * Simple utilities for injecting cookies into WebView instances
 */

export interface WebViewInstance {
    injectJavaScript: (script: string) => void;
    reload: () => void;
}

/**
 * Simple cookie injection manager
 */
export class WebViewCookieInjector {
    private static webViewInstances: Set<WebViewInstance> = new Set();

    /**
     * Register a WebView instance for cookie injection
     */
    static registerWebView(webView: WebViewInstance) {
        this.webViewInstances.add(webView);
    }

    /**
     * Unregister a WebView instance
     */
    static unregisterWebView(webView: WebViewInstance) {
        this.webViewInstances.delete(webView);
    }

    /**
     * Inject JavaScript into all registered WebViews
     */
    static injectIntoAllWebViews(script: string) {
        this.webViewInstances.forEach(webView => {
            try {
                webView.injectJavaScript(script);
            } catch (error) {
                console.error('Error injecting script into WebView:', error);
            }
        });
    }

    /**
     * Inject JavaScript into all WebViews and reload them
     */
    static injectIntoAllWebViewsAndReload(script: string) {
        this.webViewInstances.forEach(webView => {
            try {
                webView.injectJavaScript(script);
                // Small delay before reload to ensure cookie is set
                setTimeout(() => {
                    webView.reload();
                }, 100);
            } catch (error) {
                console.error('Error injecting script and reloading WebView:', error);
            }
        });
    }

    /**
     * Reload all registered WebViews
     */
    static reloadAllWebViews() {
        this.webViewInstances.forEach(webView => {
            try {
                webView.reload();
            } catch (error) {
                console.error('Error reloading WebView:', error);
            }
        });
    }

    /**
     * Inject JavaScript into a specific WebView
     */
    static injectIntoWebView(webView: WebViewInstance, script: string) {
        try {
            webView.injectJavaScript(script);
        } catch (error) {
            console.error('Error injecting script into WebView:', error);
        }
    }
}

/**
 * Simple utility functions
 */
export const webViewUtils = {
    /**
     * Create a script to set a simple cookie
     */
    createSetCookieScript: (name: string, value: string, options: {
        path?: string;
        domain?: string;
        maxAge?: number;
    } = {}): string => {
        const { path = '/', domain, maxAge = 60 * 60 * 24 * 365 } = options;
        const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

        let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}; expires=${expires}; SameSite=Lax`;

        if (domain) {
            cookieString += `; domain=${domain}`;
        }

        return `
      (function() {
        try {
          document.cookie = "${cookieString}";
          console.log("Cookie set: ${name}");
        } catch (error) {
          console.error("Error setting cookie:", error);
        }
      })();
    `;
    },

    /**
     * Create a script to clear a cookie
     */
    createClearCookieScript: (name: string, options: {
        path?: string;
        domain?: string;
    } = {}): string => {
        const { path = '/', domain } = options;

        let cookieString = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

        if (domain) {
            cookieString += `; domain=${domain}`;
        }

        return `
      (function() {
        try {
          document.cookie = "${cookieString}";
          console.log("Cookie cleared: ${name}");
        } catch (error) {
          console.error("Error clearing cookie:", error);
        }
      })();
    `;
    },
};
