import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "./ThemeContext";

interface ThemedTextProps {
  style?: TextStyle;
  children: React.ReactNode;
  type: "title" | "subtitle" | "body";
}

export const ThemedText: React.FC<ThemedTextProps> = ({ style, children, type }) => {
  const { isDarkMode } = useTheme();
  const themedStyle = {
    color: isDarkMode ? "#fff" : "#000",
   
    ...style,
  };

  return <Text style={themedStyle}>{children}</Text>;
};
