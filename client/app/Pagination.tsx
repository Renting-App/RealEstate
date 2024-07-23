import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={styles.pageButton}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.pageButton,
            page === currentPage && styles.activePageButton,
          ]}
          onPress={() => onPageChange(page)}
        >
          <Text style={styles.pageText}>{page}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.pageButton}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Ionicons name="arrow-forward" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: "#007BFF",
  },
  pageText: {
    color: "#000",
  },
});

export default Pagination;
