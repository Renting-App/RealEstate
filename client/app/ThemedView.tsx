import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "./ThemeContext";

interface ThemedViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ style, children }) => {
  const { isDarkMode } = useTheme();
  const themedStyle = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    ...style,
  };

  return <View style={themedStyle}>{children}</View>;
};
