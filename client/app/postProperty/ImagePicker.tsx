import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1sxdmac/upload";
const CLOUDINARY_PRESET = "hotel_preset";

interface ImagePickerFieldProps {
  images: string[];
  onImageSelect: (images: string[]) => void;
}

const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  images,
  onImageSelect,
}) => {
  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    Alert.alert(
      "Select Image",
      "Would you like to take a photo or select from the library?",
      [
        { text: "Take Photo", onPress: () => launchCamera() },
        { text: "Select from Library", onPress: () => launchImageLibrary() },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    handleImageResult(result);
  };

  const launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    handleImageResult(result);
  };

const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
  if (!result.canceled && result.assets) {
    const file = {
      uri: result.assets[0].uri,
      type: "image/jpeg",
      name: `photo-${images.length}.jpg`,
    };
    uploadToCloudinary(file);
  }
};

  const uploadToCloudinary = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.secure_url) {
        onImageSelect([...images, response.data.secure_url]);
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleImageSelection}
      >
        <Text style={styles.imagePickerButtonText}>Select Images</Text>
      </TouchableOpacity>
      <View style={styles.imagePreviewContainer}>
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.imagePreview}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerButton: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
  },
});

export default ImagePickerField;
