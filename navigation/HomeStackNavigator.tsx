import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoanComparisonScreen from '../screens/LoanComparisonScreen';
import PersonalLoanCalculatorScreen from '../screens/PersonalLoanCalculatorScreen';
import CarLoanCalculatorScreen from '../screens/CarLoanCalculatorScreen';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
      />
      <Stack.Screen 
        name="LoanComparison" 
        component={LoanComparisonScreen} 
      />
      <Stack.Screen 
        name="PersonalLoanCalculator" 
        component={PersonalLoanCalculatorScreen} 
      />
      <Stack.Screen 
        name="CarLoanCalculator" 
        component={CarLoanCalculatorScreen} 
      />
    </Stack.Navigator>
  );
}
