import React from "react";
import { FlatList, Text, View } from "react-native";
import EventHomeCard from "~/components/EventHomeCard";
import eventData from "~/mockData/eventData";

type Item = {
  id: string;
  title: string;
  time?: string;
  location: string;
  image: string;
};

type Item2 = {
  title: string;
  items: Item[];
  id: string;
};

const VerticalScrollComponent = () => {
  const data2 = eventData;

  return (
    <FlatList
      data={data2}
      renderItem={HorizontalScrollElement}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View
          style={{
            height: 214,
            width: 326,
            backgroundColor: "red",
            margin: 14,
            alignSelf: "center",
          }}
        ></View>
      }
    />
  );
};

// Update the renderItem function to use the Item type
const HorizontalScrollElement = ({ item }: { item: Item2 }) => {
  return (
    <View
      style={{
        height: 214,
        margin: 14,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
        }}
      >
        {item.title}
      </Text>
      <FlatList
        data={item.items}
        renderItem={Cards}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Cards = ({ item }: { item: Item }) => {
  return (
    <View>
      <Text
        style={{
          color: "white",
          fontSize: 15,
          paddingRight: 100,
        }}
      >
        <EventHomeCard eventData={item} />
      </Text>
    </View>
  );
};

export default VerticalScrollComponent;
