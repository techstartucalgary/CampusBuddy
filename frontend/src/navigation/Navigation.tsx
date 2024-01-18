import useThemeContext from '~/hooks/useThemeContext';
import {NavigationContainer} from "@react-navigation/native"
import {StatusBar} from 'expo-status-bar';
import DrawerGroup from './DrawerGroup/DrawerGroup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '~/screens/SplashScreen';
import Login from '~/screens/Login';
import StudentSignUp from '~/screens/StudentSignUp';
import StudentSignUpInfo from '~/screens/StudentSignUpInfo';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { theme } = useThemeContext();
    
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <StatusBar style="auto" />
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='SplashScreen'>
                    <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                    <Stack.Screen name="Login" component={Login} options={{gestureEnabled:false}}/>
                    <Stack.Screen name= "StudentSignUp" component={StudentSignUp} options={{gestureEnabled:false}}/>
                    /** Info screen here to test navigation and looks, will have to rework */
                    <Stack.Screen name= "StudentSignUpInfo" component={StudentSignUpInfo} options={{gestureEnabled:false}}/>
                    <Stack.Screen name="DrawerGroup" component={DrawerGroup} options={{gestureEnabled:false}}/>
                </Stack.Navigator>  
            </NavigationContainer>
        </SafeAreaProvider>
    )
}