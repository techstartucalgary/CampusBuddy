import * as React from "react";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import styled from "styled-components";
import { View } from "react-native";
import { useFonts } from "expo-font";
import useThemeContext from "~/hooks/useThemeContext";

// Sets the props of the component
type EventHomeCardProps = {
  eventData: {
    title: string;
    time: string;
    location: string;
    image: string;
    host?: string;
  };
};

// Component will generate the event card used on the home page of the application
export default function EventHomeCard({ eventData }: EventHomeCardProps) {
  // Loads the font into the component
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("~/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Reg": require("~/assets/fonts/Nunito-Reg.ttf"),
    "Roboto-Reg": require("~/assets/fonts/Roboto-Reg.ttf"),
    "Roboto-Bold": require("~/assets/fonts/Roboto-Bold.ttf"),
  });
  return (
    // Importing the Card component from React Native Paper and providing a style using styled-componenets
    <StyledCard>
      <StyledCover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ width: 159, height: 84 }}
      />
      <CardContent>
        {/* Passing the event title props to the Card */}
        <EventTitle>{eventData.title}</EventTitle>
        <EventDetailsContainer>
          {/* Passing the event time and location to the Card and using the location component*/}
          <EventTime>{eventData.time}</EventTime>
          <LocationChip location={eventData.location} />
        </EventDetailsContainer>
      </CardContent>
    </StyledCard>
  );
}

// Adding styling to the seperate card components
const StyledCard = styled(Card)`
  margin-left: 16px;
  margin-right: 16px;
  width: 159px;
  height: 130px;
  background-color: rgba(0, 0, 0, 0);
`;

const StyledCover = styled(Card.Cover)`
  width: 159px;
  height: 178px;
`;

const CardContent = styled(Card.Content)``;

const EventTitle = styled(Text)`
  font-family: Nunito-Bold;
`;

const EventTime = styled(Text)`
  font-family: Nunito-Reg;
  margin-right: 8px;
`;

const EventDetailsContainer = styled(View)`
  flex-direction: row;
  justifycontent: "space-between";
`;