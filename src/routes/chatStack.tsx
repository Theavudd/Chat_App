import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Names from '../utils/constants/componentNames';
import ChatRoom from '../screens/chat/chatRoom';
import Chats from '../screens/chat';

const ChatStack = createNativeStackNavigator();

export default function Chat() {
  return (
    <ChatStack.Navigator screenOptions={{headerShown: false}}>
      {/* <ChatStack.Screen name={Names.ChatList} component={ChatList} /> */}
      <ChatStack.Screen name={Names.ChatList} component={Chats} />
      <ChatStack.Screen name={Names.ChatRoom} component={ChatRoom} />
      {/* <ChatStack.Screen name={Names.ContactList} component={ContactList} /> */}
    </ChatStack.Navigator>
  );
}
