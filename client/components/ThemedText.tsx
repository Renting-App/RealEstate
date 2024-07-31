// ThemedText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'label' | 'default' | 'subtitle'; // Define the types
}

const ThemedText: React.FC<ThemedTextProps> = ({ type, style, ...props }) => {
  let textStyle = styles.default;

  switch (type) {
    case 'title':
      textStyle = styles.title;
      break;
    case 'label':
      textStyle = styles.label;
      break;
    case 'subtitle':
      textStyle = styles.subtitle;
      break;
    default:
      textStyle = styles.default;
  }

  return <Text style={[textStyle, style]} {...props} />;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
  },
  label: {
    fontSize: 14,
    color: '#495057',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c757d',
  },
});

export { ThemedText };
