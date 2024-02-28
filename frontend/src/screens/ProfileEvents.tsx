import { View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import useEventsContext from "~/hooks/useEventsContext";

export default function ProfileEvents() {
    const { eventsByUOfC } = useEventsContext();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ThemedText>Your Events</ThemedText>
        </View>
    );
}