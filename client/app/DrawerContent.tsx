import React from "react";
import { View, Button, StyleSheet } from "react-native";

interface DrawerContentProps {
  closeDrawer: () => void;
  openDrawer: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ closeDrawer }) => {
  return (
    <View style={styles.sidebar}>
      <Button title="Close Drawer" onPress={closeDrawer} />
      {/* Add more sidebar items here */}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
});

export default DrawerContent;
