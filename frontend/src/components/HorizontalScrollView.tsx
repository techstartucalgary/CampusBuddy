import { PropsWithChildren } from "react";
import {
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  Text,
  StyleSheet,
  View,
} from "react-native";
import EventHomeCard from "./EventHomeCard";
import sampleEventData from "~/mockData/eventData";

type Props = {
  eventData: {
    title: string;
    items: { title: string; time: string; location: string; image: string }[];
  }[];
};

export default function HorizontalScrollView() {
  const eventData = sampleEventData;

  return (
    <View key={section.title}>
      <Text style={{ marginBottom: 16, fontSize: 16 }}>{section.title}</Text>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        {section.items.map((item, index) => (
          <EventHomeCard key={index} eventData={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
