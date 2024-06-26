import React from 'react';
import { StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title }: PropsWithChildren<{ title: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [
          styles.heading,
          {
            opacity: pressed ? 0.7 : 1, // Adjust opacity when pressed
          },
        ]}
        onPress={toggleOpen}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </Pressable>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
