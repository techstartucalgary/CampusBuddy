import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileContextProvider } from "~/contexts/profileContext";
import ProfileSettings from "~/screens/ProfileSettings";
import Settings from "~/screens/Settings";
import ProfileStack from "./ProfileStack";

const Stack = createNativeStackNavigator();

export default function ProfileGroup() {
    return (
        <ProfileContextProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Profile" component={ProfileStack} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
            <ProfileSettings />
        </ProfileContextProvider>
    );
}