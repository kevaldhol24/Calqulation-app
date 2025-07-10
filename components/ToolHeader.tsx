import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

interface ToolHeaderProps {
  title: string;
  icon: string;
  onRefresh?: () => void;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({
  title,
  icon,
  onRefresh,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  // Create styles based on current theme
  const styles = createStyles(theme);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6e11b0"
        translucent
      />
      <LinearGradient
        colors={["#6e11b0", "#6e11b0", "#1c398e"]}
        locations={[0, 0.05, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top - 16 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIconContainer}>
              <Ionicons name={icon as any} size={24} color="#ffffff" />
            </View>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          {onRefresh && (
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
              <Ionicons name="refresh" size={20} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  headerGradient: {
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});
