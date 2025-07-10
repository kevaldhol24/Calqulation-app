import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  StatusBar,
  Animated,
  ImageBackground,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onPress: () => void;
  disabled?: boolean;
  comingSoon?: boolean;
}

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  // Create styles based on current theme
  const styles = createStyles(theme);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const tools: Tool[] = [
    {
      id: "offline-emi",
      title: "Offline EMI Calculator",
      description: "Basic EMI calculation without internet",
      icon: "calculator-outline",
      color: theme.colors.success,
      onPress: () => navigation.navigate("OfflineEMICalculator"),
    },
    {
      id: "emi",
      title: "Advanced EMI Tool",
      description: "Calculate your loan EMI and total interest",
      icon: "calculator",
      color: theme.colors.info,
      onPress: () => navigation.navigate("EMI Calculator"),
    },
    {
      id: "sip",
      title: "SIP Calculator",
      description: "Calculate your SIP investments and returns",
      icon: "trending-up",
      color: theme.colors.success,
      onPress: () => navigation.navigate("SIP Calculator"),
    },
    {
      id: "loan-comparison",
      title: "Loan Comparison",
      description: "Compare different loan options and rates",
      icon: "swap-horizontal",
      color: "#9C27B0",
      onPress: () => navigation.navigate("LoanComparison"),
    },
    {
      id: "personal-loan",
      title: "Personal Loan Calculator",
      description: "Calculate personal loan EMI and interest",
      icon: "person",
      color: "#FF5722",
      onPress: () => navigation.navigate("PersonalLoanCalculator"),
    },
    {
      id: "car-loan",
      title: "Car Loan Calculator",
      description: "Calculate car loan EMI and total cost",
      icon: "car",
      color: "#607D8B",
      onPress: () => navigation.navigate("CarLoanCalculator"),
    },
    {
      id: "blog",
      title: "Financial Blog",
      description: "Read latest financial insights and tips",
      icon: "library",
      color: theme.colors.warning,
      onPress: () => navigation.navigate("Blog"),
    },
    {
      id: "ppf",
      title: "PPF Calculator",
      description: "Public Provident Fund calculator",
      icon: "shield-checkmark",
      color: theme.colors.primary,
      disabled: true,
      comingSoon: true,
      onPress: () => {},
    },
    {
      id: "fd",
      title: "FD Calculator",
      description: "Fixed Deposit calculator",
      icon: "lock-closed",
      color: theme.colors.secondary,
      disabled: true,
      comingSoon: true,
      onPress: () => {},
    },
    {
      id: "tax",
      title: "Tax Calculator",
      description: "Income tax calculator",
      icon: "receipt",
      color: "#795548",
      disabled: true,
      comingSoon: true,
      onPress: () => {},
    },
  ];

  const renderTool = (tool: Tool, index: number) => {
    return (
      <TouchableOpacity
        key={tool.id}
        style={[styles.modernCard, tool.disabled && styles.disabledCard]}
        onPress={tool.disabled ? undefined : tool.onPress}
        activeOpacity={tool.disabled ? 1 : 0.8}
        disabled={tool.disabled}
      >
        <LinearGradient
          colors={
            tool.disabled
              ? ["#f0f0f0", "#e0e0e0"]
              : [tool.color + "15", tool.color + "05"]
          }
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.modernIconContainer,
                { backgroundColor: tool.disabled ? "#ccc" : tool.color },
              ]}
            >
              <Ionicons name={tool.icon as any} size={24} color="#ffffff" />
            </View>
            {tool.comingSoon && (
              <View style={styles.modernComingSoonBadge}>
                <Text style={styles.modernComingSoonText}>Soon</Text>
              </View>
            )}
          </View>

          <View style={styles.cardContent}>
            <Text
              style={[
                styles.modernToolTitle,
                tool.disabled && styles.disabledText,
              ]}
            >
              {tool.title}
            </Text>
            <Text
              style={[
                styles.modernToolDescription,
                tool.disabled && styles.disabledText,
              ]}
            >
              {tool.description}
            </Text>
          </View>

          <View style={styles.cardAction}>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={tool.disabled ? "#ccc" : tool.color}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6e11b0"
        translucent
      />
      <LinearGradient
        colors={["#6e11b0", "#6e11b0", "#1c398e"]}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Calqulation</Text>
            <Text style={styles.headerSubtitle}>
              Smart financial calculation tools
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons
              name="calculator"
              size={28}
              color="#ffffff"
              opacity={0.9}
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.welcomeSection}>
          <LinearGradient
            colors={[theme.colors.surface, theme.colors.background]}
            style={styles.welcomeGradient}
          >
            <View style={styles.welcomeHeader}>
              <View style={styles.welcomeIconContainer}>
                <Ionicons
                  name="trending-up"
                  size={28}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeTitle}>Welcome to Calqulation</Text>
                <Text style={styles.welcomeText}>
                  Smart financial calculation tools to help you make better
                  decisions for your financial journey.
                </Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>6+</Text>
                <Text style={styles.statLabel}>Tools</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>Free</Text>
                <Text style={styles.statLabel}>Forever</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>Fast</Text>
                <Text style={styles.statLabel}>Results</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: "#4CAF5010" },
                ]}
              >
                <Ionicons name="flash" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.featureText}>Easy to Use</Text>
            </View>
            <View style={styles.featureItem}>
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: "#2196F310" },
                ]}
              >
                <Ionicons name="document-text" size={24} color="#2196F3" />
              </View>
              <Text style={styles.featureText}>Detailed Reports</Text>
            </View>
            <View style={styles.featureItem}>
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: "#FF980010" },
                ]}
              >
                <Ionicons name="checkmark-circle" size={24} color="#FF9800" />
              </View>
              <Text style={styles.featureText}>Instant Results</Text>
            </View>
          </View>
        </View>

        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Financial Calculators</Text>
          <Text style={styles.sectionSubtitle}>
            Powerful tools to help you plan your financial future with
            confidence
          </Text>

          <View style={styles.toolsList}>
            {tools
              .reduce((rows: Tool[][], tool: Tool, index: number) => {
                if (index % 2 === 0) {
                  rows.push([tool]);
                } else {
                  rows[rows.length - 1].push(tool);
                }
                return rows;
              }, [])
              .map((row: Tool[], rowIndex: number) => (
                <View
                  key={rowIndex}
                  style={[
                    styles.toolsRow,
                    rowIndex === Math.ceil(tools.length / 2) - 1 && {
                      marginBottom: 0,
                    },
                  ]}
                >
                  {row.map((tool: Tool) =>
                    renderTool(tool, tools.indexOf(tool))
                  )}
                  {row.length === 1 && <View style={styles.toolCardSpacer} />}
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#ffffff",
    opacity: 0.9,
    letterSpacing: -0.2,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    margin: 16,
    borderRadius: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  welcomeGradient: {
    padding: 20,
  },
  welcomeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  welcomeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: theme.colors.border,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: theme.colors.surface,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: -0.1,
  },
  toolsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 20,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  toolsList: {
    gap: 16,
  },
  toolsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  toolCardSpacer: {
    width: (width - 48) / 2, // Same width as a card to maintain spacing
  },
  // Modern card styles
  modernCard: {
    width: (width - 48) / 2, // Two cards per row with 16px margins and gap
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  cardGradient: {
    padding: 16,
    height: 160, // Fixed height for consistent grid
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  modernIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modernComingSoonBadge: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: theme.colors.warning,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  modernComingSoonText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  modernToolTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  modernToolDescription: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    letterSpacing: -0.1,
  },
  cardAction: {
    alignItems: "flex-end",
  },
  // Legacy styles for backward compatibility
  toolCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    flex: 1,
  },
  toolDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  disabledCard: {
    opacity: 0.8,
  },
  disabledText: {
    color: theme.colors.textLight,
    opacity: 0.8,
  },
  comingSoonBadge: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  comingSoonText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
