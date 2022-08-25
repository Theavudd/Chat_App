import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Names from '../utils/constants/componentNames';
import Auth from './authStack';
import Chat from './chatStack';
import SplashScreen from '../screens/splash';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Names.Splash} component={SplashScreen} />
        <Stack.Screen name={Names.Auth} component={Auth} />
        <Stack.Screen name={Names.Chat} component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
