import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home.js';
import UseCamera from './components/Camera.js';
import ShowVideos from './components/ShowVideos.js';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Camera" component={UseCamera} />
                <Stack.Screen name="Videos" component={ShowVideos} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

