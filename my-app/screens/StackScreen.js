import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';

const Stack = createStackNavigator();

const StackScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home Screen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home Screen" component={HomeScreen} />
            <Stack.Screen name="Screen One" component={ScreenOne} />
            <Stack.Screen name="Screen Two" component={ScreenTwo} />
        </Stack.Navigator>
    )
}

export default StackScreens;