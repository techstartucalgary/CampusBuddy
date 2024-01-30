import React from "react";
import { FlatList, Text, View } from "react-native";
import EventHomeCard from "~/components/EventHomeCard";

type Item2 = {
  id: string;
  title: string;
  time: string;
  location: string;
  image: string;
};

const VerticalScrollComponent = () => {
  const data2: Item2[] = [
    {
      id: "1",
      title: "Weekly Bouldering",
      time: "Jan 4",
      location: "UofC Kines Block",
      image: "",
    },
    {
      id: "2",
      title: "Volleyball Tournament",
      time: "Jan 14",
      location: "UofC Kines Block",
      image: "",
    },
    {
      id: "3",
      title: "Networking Night",
      time: "Jan 15",
      location: "MacHall",
      image: "",
    },
    {
      id: "4",
      title: "Networking Night",
      time: "Jan 15",
      location: "MacHall",
      image: "",
    },
    {
      id: "5",
      title: "Weekly Bouldering",
      time: "Jan 4",
      location: "UofC Kines Block",
      image: "",
    },
    {
      id: "6",
      title: "Volleyball Tournament",
      time: "Jan 14",
      location: "UofC Kines Block",
      image: "",
    },
    {
      id: "7",
      title: "Networking Night",
      time: "Jan 15",
      location: "MacHall",
      image: "",
    },
    {
      id: "8",
      title: "Networking Night",
      time: "Jan 15",
      location: "MacHall",
      image: "",
    },
  ];

  return (
    <FlatList
      data={data2}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

// Update the renderItem function to use the Item type
const renderItem = ({ item }: { item: Item2 }) => (
  <View
    style={{
      width: 367,
      height: 168,
      marginTop: 16,
    }}
  >
    <EventHomeCard eventData={item} />
  </View>
);

export default VerticalScrollComponent;
