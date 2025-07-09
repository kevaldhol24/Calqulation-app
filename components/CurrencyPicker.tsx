import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { CurrencyOption, CURRENCIES, currencyUtils } from '../utils/currencyManager';

interface CurrencyPickerProps {
  selectedCurrency: CurrencyOption;
  onCurrencyChange: (currency: CurrencyOption) => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}

export const CurrencyPicker: React.FC<CurrencyPickerProps> = ({
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
  isLoading = false,
}) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleCurrencySelect = async (currency: CurrencyOption) => {
    setUpdating(true);
    try {
      await onCurrencyChange(currency);
      setModalVisible(false);
    } catch (error) {
      console.error('Error changing currency:', error);
    } finally {
      setUpdating(false);
    }
  };

  const renderCurrencyItem = ({ item }: { item: CurrencyOption }) => (
    <TouchableOpacity
      style={[
        styles.currencyItem,
        selectedCurrency.currency === item.currency && styles.selectedCurrencyItem,
      ]}
      onPress={() => handleCurrencySelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.currencyItemLeft}>
        <Text style={styles.flagEmoji}>
          {currencyUtils.getFlagEmoji(item.flag)}
        </Text>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencySymbol}>{item.symbol}</Text>
          <Text style={styles.currencyCode}>{item.currency}</Text>
        </View>
        <Text style={styles.currencyLabel}>{item.label}</Text>
      </View>
      {selectedCurrency.currency === item.currency && (
        <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.pickerButton, (disabled || isLoading || updating) && styles.disabledButton]}
        onPress={() => !(disabled || isLoading || updating) && setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.pickerButtonContent}>
          <Text style={styles.flagEmoji}>
            {currencyUtils.getFlagEmoji(selectedCurrency.flag)}
          </Text>
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedSymbol}>{selectedCurrency.symbol}</Text>
            <Text style={styles.selectedCurrency}>{selectedCurrency.currency}</Text>
          </View>
        </View>
        {(isLoading || updating) ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color={(disabled || isLoading || updating) ? '#ccc' : '#666'} 
          />
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => !updating && setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity
                style={[styles.closeButton, updating && styles.disabledButton]}
                onPress={() => !updating && setModalVisible(false)}
                disabled={updating}
              >
                <Ionicons name="close" size={24} color={updating ? '#ccc' : '#333'} />
              </TouchableOpacity>
            </View>
            
            {updating && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Updating currency...</Text>
              </View>
            )}
            
            <FlatList
              data={CURRENCIES}
              renderItem={renderCurrencyItem}
              keyExtractor={(item) => item.currency}
              style={[styles.currencyList, updating && styles.disabledList]}
              showsVerticalScrollIndicator={false}
              scrollEnabled={!updating}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  disabledButton: {
    opacity: 0.5,
  },
  pickerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  selectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  selectedCurrency: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.7,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  currencyList: {
    paddingHorizontal: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: '#f8f9fa',
  },
  selectedCurrencyItem: {
    backgroundColor: '#6e11b020',
    borderWidth: 1,
    borderColor: '#6e11b040',
  },
  currencyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencyInfo: {
    marginRight: 12,
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  currencyCode: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  currencyLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  disabledList: {
    opacity: 0.5,
  },
});
