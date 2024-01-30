import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
import { Button, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Chip } from "react-native-paper";
import HorizontalScrollView from "~/components/HorizontalScrollView";
import { ThemedText } from "~/components/ThemedComponents";
import useLoadingContext from "~/hooks/useLoadingContext";
import { getRequest } from "~/lib/CBRequest";
import VerticalScrollView from "~/components/VerticalScrollView";



export default function Home() {
  const { startLoading, stopLoading } = useLoadingContext();
  const [image, setImage] = useState<string>();

  const testCallback = async () => {
    await getRequest("/Test", {})
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const { navigate } = useNavigation<any>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await UploadImage(result.assets[0]);

      return;
    }
    console.log(result);
  };

  const UploadImage = async (selectedImage: ImagePickerAsset) => {
    const uri =
      Platform.OS === "android"
        ? selectedImage.uri
        : selectedImage.uri.replace("file://", "");
    const filename = selectedImage.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: `image.${ext}`,
      type,
    } as any);
    try {
      const { data } = await axios.post(`${URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image Uploaded");
    } catch (err) {
      console.log(err);
      alert("Something went wrong in the Upload Function!");
    }
  };

  return (
      <VerticalScrollView/>
  );
}

const styles = StyleSheet.create({
  mockEventsContainer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    height: "auto",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mockEventContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
  },
  ScrollContainer: {
    paddingTop: 16,
    paddingBottom: 16,
},
scrollHeader: {
    textAlign:'left',
},
});
