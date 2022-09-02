import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  chat: {},
};

const ChatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    addMessage: (state: any, action: any) => {
      const {payload} = action;
      state.chat[payload.roomid] = [...state.chat[payload.roomid], payload];
    },
    addRoom: (state: any) => {
      state.chat = {...state.chat, payload: []};
    },
    updateChat: (state: any, action) => {
      const {payload} = action;
      state.chat[payload.roomid] = payload.data;
    },
  },
});
export default ChatSlice.reducer;
