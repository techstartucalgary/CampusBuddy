import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { EventMapItem } from "~/types/Events";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import useNavigationContext from "~/hooks/useNavigationContext";

type MapProps = {
  latitudeDelta?: number;
  longitudeDelta?: number;
  showInfo?: boolean;
  currentLocation: LatLng;
  events?: EventMapItem[];
  items?: EventMapItem[];
};

// This is a simple map component that displays a map with a marker at the given latitude and longitude.
// This fills the entire screen and has a back button to return to the previous screen.
const Map = ({
  latitudeDelta = 0.04,
  longitudeDelta = 0.04,
  showInfo = false,
  currentLocation,
  events,
  items,
}: MapProps) => {
  const { navigateTo } = useNavigationContext();
  const { theme, inDarkMode } = useThemeContext();

  const openEventDetails = useCallback(
    (index: number) => {
      if (showInfo) return;
      navigateTo({
        page: "EventDetails",
        id: events ? events[index].id : "",
        map: false,
      });
    },
    [events],
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        showsUserLocation={true}
        customMapStyle={inDarkMode ? darkModeStyle : []}
      >
        {events &&
          events.map((event: EventMapItem, index) => {
            return (
              <Marker
                key={index}
                title={showInfo ? event.title : ""}
                description={showInfo ? event.description : ""}
                coordinate={adjustPosition(event, index, events)}
                onPress={() => openEventDetails(index)}
              >
                <View style={circleStyles.circleStyle}>
                  <MaterialIcons name="event-available" size={24} color="red" />
                </View>
              </Marker>
            );
          })}
        {items &&
          items.map((item: EventMapItem, index) => {
            return (
              <Marker
                key={index}
                title={showInfo ? item.title : ""}
                description={showInfo ? item.description : ""}
                coordinate={adjustPosition(item, index, items)}
                onPress={() => {
                  Alert.alert("Stay Tuned!", "This feature is coming soon!");
                }}
              >
                <View style={circleStyles.circleStyle}>
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
};

const adjustPosition = (
  event: EventMapItem,
  index: number,
  events: EventMapItem[],
) => {
  const adjustment = 0.0003; // Small adjustment value
  let duplicates = events.filter(
    (e) => e.latitude === event.latitude && e.longitude === event.longitude,
  );
  if (duplicates.length > 1) {
    let angle = (360 / duplicates.length) * index; // distribute evenly in a circle
    return {
      latitude: event.latitude + adjustment * Math.cos(angle * (Math.PI / 180)),
      longitude:
        event.longitude + adjustment * Math.sin(angle * (Math.PI / 180)),
    };
  }
  return {
    latitude: event.latitude,
    longitude: event.longitude,
  };
};

export const darkModeStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334e87" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f9ba5" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3C7680" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c6675" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#255763" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0d5ce" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#3a4762" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }],
  },
];

// prettier-ignore
const styles = {
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
};

const circleStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  circleStyle: {
    backgroundColor: "white", // TODO change to theme color based on dark/light mode
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
