import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  menuIcon: {
    marginLeft: 10,
  },
  bgContainer: {
    textAlign: "center",
  },
  banner: {
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  bannerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
    width: width * 0.8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#1183CE",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cardsContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  typeContainer: {
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  rent: {
    backgroundColor: "#6FDCE3",
  },
  sale: {
    backgroundColor: "#FFC700",
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  price: {
    marginBottom: 10,
  },
  contact: {
    marginBottom: 10,
  },
  prevButton: {
    position: "absolute",
    bottom: 2,
    left: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
  nextButton: {
    position: "absolute",
    bottom: 2,
    right: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
});

export default styles;
