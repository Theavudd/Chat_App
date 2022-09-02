import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  countryCode: '',
  phoneNo: '',
  uid: '',
  name: '',
  avatar: '',
  inbox: [],
  contactList: [],
  blockList: [],
  online: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {payload} = action;
      state.countryCode = payload.countryCode;
      state.phoneNo = payload.phoneNo;
    },
    storeUID: (state, action) => {
      state.uid = action.payload;
    },
    signOut: state => {
      state.uid = '';
      state.countryCode = '';
      state.phoneNo = '';
      state.avatar = '';
      state.name = '';
      state.online = false;
      state.inbox = [];
      state.contactList = [];
    },
    StoreImage: (state: any, action) => {
      state.avatar = action.payload;
    },
    storeSignUpDetails: (state: any, action) => {
      const {payload} = action;
      console.log('payl', payload);
      state.status = payload.status;
      state.name = payload.Name;
    },
    setOnlineStatus: (state: any, action) => {
      state.online = action.payload;
    },
    updateInbox: (state: any, action: any) => {
      const {payload} = action;
      state.inbox = payload;
    },
    updateUsers: (state: any, action: any) => {
      const {payload} = action;
      state.contactList = payload;
    },
    storeUserDetails: (state: any, action: any) => {
      const {payload} = action;
      state.uid = payload.id;
      state.countryCode = payload.CountryCode;
      state.phoneNo = payload.PhoneNo;
      state.avatar = payload.avatar;
      state.name = payload.Name;
      state.online = payload.online;
    },
    updateBlackList: (state: any, action: any) => {
      const {payload} = action;
      state.blockList = payload;
    },
  },
});
export const {login} = AuthSlice.actions;
export default AuthSlice.reducer;
