import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Names from '../utils/constants/componentNames';
import Login from '../screens/auth/login';
import OTP from '../screens/auth/otp';
import SignUp from '../screens/auth/signup';
import {useSelector} from 'react-redux';

const AuthStack = createNativeStackNavigator();

export default function Auth() {
  const {name, uid} = useSelector((state: any) => state.authReducer);
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        name === '' ? (uid === '' ? Names.Login : Names.Signup) : Names.Login
      }>
      <AuthStack.Screen name={Names.Login} component={Login} />
      <AuthStack.Screen name={Names.OTP} component={OTP} />
      <AuthStack.Screen name={Names.Signup} component={SignUp} />
    </AuthStack.Navigator>
  );
}
