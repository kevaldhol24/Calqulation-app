import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { ToolHeader } from '../components/ToolHeader';

export default function OfflineEMICalculatorScreen() {
  const theme = useTheme();
  const { selectedCurrency } = useCurrency();
  const symbol = selectedCurrency.symbol;
  
  // State for input values
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emiAmount, setEmiAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const [error, setError] = useState('');
  
  // Animation values
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const resultTranslateY = useRef(new Animated.Value(50)).current;
  
  // Function to calculate EMI
  const calculateEMI = () => {
    Keyboard.dismiss();
    
    // Validate inputs
    if (!loanAmount || !interestRate || !loanTenure) {
      setError('Please fill all fields to calculate EMI.');
      setIsCalculated(false);
      return;
    }
    
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / 12 / 100;
    const tenureInMonths = parseFloat(loanTenure);
    
    // Validate numerical values
    if (isNaN(principal) || isNaN(ratePerMonth) || isNaN(tenureInMonths)) {
      setError('Please enter valid numerical values.');
      setIsCalculated(false);
      return;
    }
    
    if (principal <= 0 || parseFloat(interestRate) <= 0 || tenureInMonths <= 0) {
      setError('Values must be greater than zero.');
      setIsCalculated(false);
      return;
    }
    
    try {
      // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureInMonths) 
                / (Math.pow(1 + ratePerMonth, tenureInMonths) - 1);
      
      const totalPayment = emi * tenureInMonths;
      const totalInterestPayment = totalPayment - principal;
      
      if (isNaN(emi) || !isFinite(emi)) {
        setError('Something went wrong with the calculation. Please check your inputs.');
        setIsCalculated(false);
        return;
      }
      
      setEmiAmount(emi);
      setTotalAmount(totalPayment);
      setTotalInterest(totalInterestPayment);
      setError('');
      setIsCalculated(true);
      
      // Animate results
      Animated.parallel([
        Animated.timing(resultOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(resultTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ]).start();
      
    } catch (e) {
      setError('Calculation error. Please check your inputs.');
      setIsCalculated(false);
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setEmiAmount(null);
    setTotalInterest(null);
    setTotalAmount(null);
    setIsCalculated(false);
    setError('');
    
    // Reset animations
    resultOpacity.setValue(0);
    resultTranslateY.setValue(50);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ToolHeader 
        title="Offline EMI Calculator" 
        icon="calculator"
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.infoContainer}>
            <LinearGradient
              colors={['#6e11b020', '#1c398e20']}
              style={styles.infoBox}
            >
              <Ionicons name="information-circle-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.infoText}>
                This offline calculator provides a basic EMI estimate. For detailed analysis, use the Advanced EMI Calculator.
              </Text>
            </LinearGradient>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Loan Amount ({symbol})</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border }]}
              placeholder={`Enter loan amount`}
              value={loanAmount}
              onChangeText={setLoanAmount}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textLight}
            />
            
            <Text style={styles.inputLabel}>Interest Rate (% per annum)</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border }]}
              placeholder="Enter interest rate"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textLight}
            />
            
            <Text style={styles.inputLabel}>Loan Tenure (in months)</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.colors.border }]}
              placeholder="Enter loan tenure"
              value={loanTenure}
              onChangeText={setLoanTenure}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textLight}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.calculateButton]}
                onPress={calculateEMI}
              >
                <LinearGradient
                  colors={['#6e11b0', '#1c398e']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Calculate</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.resetButton]}
                onPress={resetForm}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {isCalculated && (
            <Animated.View 
              style={[
                styles.resultsContainer,
                {
                  opacity: resultOpacity,
                  transform: [{ translateY: resultTranslateY }]
                }
              ]}
            >
              <LinearGradient
                colors={['#6e11b020', '#1c398e20']}
                style={styles.resultCard}
              >
                <View style={styles.resultHeader}>
                  <Text style={styles.resultHeaderText}>EMI Summary</Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Monthly EMI:</Text>
                  <Text style={styles.resultValue}>
                    {symbol} {emiAmount ? formatCurrency(emiAmount) : '0.00'}
                  </Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total Interest:</Text>
                  <Text style={styles.resultValue}>
                    {symbol} {totalInterest ? formatCurrency(totalInterest) : '0.00'}
                  </Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total Payment:</Text>
                  <Text style={[styles.resultValue, styles.totalValue]}>
                    {symbol} {totalAmount ? formatCurrency(totalAmount) : '0.00'}
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculateButton: {
    flex: 0.68,
    overflow: 'hidden',
  },
  resetButton: {
    flex: 0.28,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  resultCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultHeader: {
    marginBottom: 15,
    alignItems: 'center',
  },
  resultHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  resultLabel: {
    fontSize: 15,
    color: '#555',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6e11b0',
  }
});
