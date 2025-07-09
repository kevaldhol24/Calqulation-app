/**
 * Currency Management Utilities
 * 
 * This module provides currency data and utilities for managing
 * currency preferences and creating cookies for the Calqulation website
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCY_STORAGE_KEY = 'calqulation_selected_currency';

export interface CurrencyOption {
    label: string;
    symbol: string;
    currency: string;
    iso: string;
    flag: string;
    style: string;
    currencyDisplay: string;
    maximumFractionDigits: number;
}

export const CURRENCIES: CurrencyOption[] = [
    {
        label: "₹ INR - Indian Rupee",
        symbol: "₹",
        currency: "INR",
        iso: "en-IN",
        flag: "IN",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    },
    {
        label: "$ USD - US Dollar",
        symbol: "$",
        currency: "USD",
        iso: "en-US",
        flag: "US",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    },
    {
        label: "£ GBP - British Pound",
        symbol: "£",
        currency: "GBP",
        iso: "en-GB",
        flag: "GB",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    },
    {
        label: "€ EUR - Euro",
        symbol: "€",
        currency: "EUR",
        iso: "en-EU",
        flag: "EU",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    },
    {
        label: "¥ JPY - Japanese Yen",
        symbol: "¥",
        currency: "JPY",
        iso: "ja-JP",
        flag: "JP",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 0,
    },
    {
        label: "C$ CAD - Canadian Dollar",
        symbol: "C$",
        currency: "CAD",
        iso: "en-CA",
        flag: "CA",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    },
    {
        label: "A$ AUD - Australian Dollar",
        symbol: "A$",
        currency: "AUD",
        iso: "en-AU",
        flag: "AU",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    },
    {
        label: "₩ KRW - South Korean Won",
        symbol: "₩",
        currency: "KRW",
        iso: "ko-KR",
        flag: "KR",
        style: "currency",
        currencyDisplay: "symbol",
        maximumFractionDigits: 0,
    },
];

/**
 * Get the default currency (Indian Rupee)
 */
export const getDefaultCurrency = (): CurrencyOption => {
    return CURRENCIES[0]; // INR
};

/**
 * Find currency by currency code
 */
export const getCurrencyByCode = (currencyCode: string): CurrencyOption | undefined => {
    return CURRENCIES.find(currency => currency.currency === currencyCode);
};

/**
 * Create currency cookie data for Calqulation website
 */
export const createCurrencyCookieData = (currency: CurrencyOption): string => {
    return JSON.stringify({
        label: currency.label,
        symbol: currency.symbol,
        currency: currency.currency,
        iso: currency.iso,
        flag: currency.flag,
        style: currency.style,
        currencyDisplay: currency.currencyDisplay,
        maximumFractionDigits: currency.maximumFractionDigits,
    });
};

/**
 * Create JavaScript code to set currency cookie in WebView and immediately apply changes
 */
export const createCurrencyCookieScript = (currency: CurrencyOption): string => {
    const cookieData = createCurrencyCookieData(currency);
    const escapedData = cookieData.replace(/"/g, '\\"');

    return `
    (function() {
      try {
        const cookieValue = "${escapedData}";
        const maxAge = 60 * 60 * 24 * 3650; // 10 years in seconds
        const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
        
        // Set cookie for main domain
        document.cookie = "currency=" + encodeURIComponent(cookieValue) + 
                         "; path=/" + 
                         "; expires=" + expires + 
                         "; domain=.calqulation.com" +
                         "; SameSite=Lax";
        
        // Also set without domain for localhost/development
        document.cookie = "currency=" + encodeURIComponent(cookieValue) + 
                         "; path=/" + 
                         "; expires=" + expires + 
                         "; SameSite=Lax";
        
        console.log("Currency cookie set:", cookieValue);
        
        // Store in localStorage as backup
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('currency', cookieValue);
        }
        
        // Trigger immediate currency update without reload
        if (typeof window !== 'undefined') {
          const currencyData = JSON.parse(cookieValue);
          
          // Dispatch custom event
          window.dispatchEvent(new CustomEvent('currencyChanged', { 
            detail: { currency: currencyData } 
          }));
          
          // Try various methods to trigger immediate update
          if (window.changeCurrency && typeof window.changeCurrency === 'function') {
            window.changeCurrency(currencyData);
          }
          
          if (window.updateCurrency && typeof window.updateCurrency === 'function') {
            window.updateCurrency(currencyData);
          }
          
          if (window.setCurrency && typeof window.setCurrency === 'function') {
            window.setCurrency(currencyData);
          }
          
          // Try to update any currency selectors on the page
          const currencySelectors = document.querySelectorAll('select[name*="currency"], select[id*="currency"], .currency-selector');
          currencySelectors.forEach(function(selector) {
            if (selector.value !== undefined) {
              selector.value = currencyData.currency;
              // Trigger change event
              const event = new Event('change', { bubbles: true });
              selector.dispatchEvent(event);
            }
          });
          
          // Force a soft refresh of dynamic content
          setTimeout(function() {
            // Trigger scroll event to refresh any lazy-loaded content
            window.dispatchEvent(new Event('scroll'));
            
            // Try to trigger React/Vue re-render if applicable
            if (window.React && window.React.version) {
              window.dispatchEvent(new Event('resize'));
            }
          }, 100);
        }
        
      } catch (error) {
        console.error("Error setting currency cookie:", error);
      }
    })();
  `;
};

/**
 * Currency utilities for managing preferences
 */
export const currencyUtils = {
    /**
     * Get stored currency preference from AsyncStorage
     */
    getStoredCurrency: async (): Promise<CurrencyOption> => {
        try {
            const storedCurrencyJson = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
            if (storedCurrencyJson) {
                const storedCurrency = JSON.parse(storedCurrencyJson);
                // Validate that the stored currency is still in our list
                const foundCurrency = getCurrencyByCode(storedCurrency.currency);
                if (foundCurrency) {
                    return foundCurrency;
                }
            }
        } catch (error) {
            console.error('Error getting stored currency:', error);
        }
        // Return default if nothing stored or error
        return getDefaultCurrency();
    },

    /**
     * Store currency preference in AsyncStorage
     */
    storeCurrency: async (currency: CurrencyOption): Promise<void> => {
        try {
            await AsyncStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(currency));
            console.log('Currency preference stored:', currency.currency);
        } catch (error) {
            console.error('Error storing currency preference:', error);
        }
    },

    /**
     * Clear stored currency preference
     */
    clearStoredCurrency: async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(CURRENCY_STORAGE_KEY);
            console.log('Currency preference cleared');
        } catch (error) {
            console.error('Error clearing currency preference:', error);
        }
    },

    /**
     * Get flag emoji for currency
     */
    getFlagEmoji: (countryCode: string): string => {
        const flagMap: { [key: string]: string } = {
            'IN': '🇮🇳',
            'US': '🇺🇸',
            'GB': '🇬🇧',
            'EU': '🇪🇺',
            'JP': '🇯🇵',
            'CA': '🇨🇦',
            'AU': '🇦🇺',
            'KR': '🇰🇷',
        };
        return flagMap[countryCode] || '🌍';
    },
};
