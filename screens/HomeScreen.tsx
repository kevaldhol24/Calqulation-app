import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const tools: Tool[] = [
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Calculate your SIP investments and returns',
      icon: 'trending-up',
      color: '#4CAF50',
      onPress: () => navigation.navigate('SIP Calculator'),
    },
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your loan EMI and total interest',
      icon: 'calculator',
      color: '#2196F3',
      onPress: () => navigation.navigate('EMI Calculator'),
    },
    {
      id: 'blog',
      title: 'Financial Blog',
      description: 'Read latest financial insights and tips',
      icon: 'library',
      color: '#FF9800',
      onPress: () => navigation.navigate('Blog'),
    },
    {
      id: 'ppf',
      title: 'PPF Calculator',
      description: 'Public Provident Fund calculator',
      icon: 'shield-checkmark',
      color: '#9C27B0',
      onPress: () => console.log('PPF Calculator coming soon!'),
    },
    {
      id: 'fd',
      title: 'FD Calculator',
      description: 'Fixed Deposit calculator',
      icon: 'lock-closed',
      color: '#607D8B',
      onPress: () => console.log('FD Calculator coming soon!'),
    },
    {
      id: 'tax',
      title: 'Tax Calculator',
      description: 'Income tax calculator',
      icon: 'receipt',
      color: '#795548',
      onPress: () => console.log('Tax Calculator coming soon!'),
    },
  ];

  const renderTool = (tool: Tool, index: number) => (
    <TouchableOpacity
      key={tool.id}
      style={[styles.toolCard, { borderLeftColor: tool.color }]}
      onPress={tool.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.toolCardContent}>
        <View style={[styles.iconContainer, { backgroundColor: tool.color + '20' }]}>
          <Ionicons name={tool.icon as any} size={24} color={tool.color} />
        </View>
        <View style={styles.toolInfo}>
          <Text style={styles.toolTitle}>{tool.title}</Text>
          <Text style={styles.toolDescription}>{tool.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calqulation</Text>
        <Text style={styles.headerSubtitle}>Smart financial calculation tools</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Calqulation</Text>
          <Text style={styles.welcomeText}>
            Smart financial calculation tools to help you make better decisions for your financial journey.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <Ionicons name="flash" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Easy to Use</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="document-text" size={20} color="#2196F3" />
              <Text style={styles.featureText}>Detailed Reports</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#FF9800" />
              <Text style={styles.featureText}>Instant Results</Text>
            </View>
          </View>
        </View>

        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Financial Calculators</Text>
          <Text style={styles.sectionSubtitle}>
            Powerful tools to help you plan your financial future with confidence
          </Text>
          
          <View style={styles.toolsList}>
            {tools.map((tool, index) => renderTool(tool, index))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6a4c93',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  toolsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  toolsList: {
    gap: 12,
  },
  toolCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});
