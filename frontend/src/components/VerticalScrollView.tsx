import React from "react";
import { FlatList, Text, View } from "react-native";

// Define a type for the data items
interface Item {
  id: number;
  title: string;
}

const VerticalScrollComponent = () => {
  const data: Item[] = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
    { id: 4, title: "Item 4" },
    { id: 5, title: "Item 5" },
  ];

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

// Update the renderItem function to use the Item type
const renderItem = ({ item }: { item: Item }) => (
  <View>
    <Text
      style={{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}
    >
      {item.title}
    </Text>
  </View>
);

export default VerticalScrollComponent;
