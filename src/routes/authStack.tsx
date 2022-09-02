import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Names from '../utils/constants/componentNames';
import Login from '../screens/auth/login';
import OTP from '../screens/auth/otp';

const AuthStack = createNativeStackNavigator();

export default function Auth() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={Names.Login} component={Login} />
      <AuthStack.Screen name={Names.OTP} component={OTP} />
    </AuthStack.Navigator>
  );
}
