import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  countryCode: '',
  phoneNo: '',
  uid: '',
  name: '',
  image: '',
  inbox: [],
  online: null,
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
      state.uid = initialState.uid;
      state.countryCode = initialState.countryCode;
      state.phoneNo = initialState.phoneNo;
      state.image = initialState.image;
      state.name = initialState.name;
    },
    StoreImage: (state: any, action) => {
      state.image = action.payload;
    },
    storeName: (state: any, action) => {
      state.name = action.payload;
    },
    setOnlineStatus: (state: any, action) => {
      console.log('payload', action.payload);
      state.online = action.payload;
    },
    updateUsers: (state: any, action: any) => {
      const {payload} = action;
      state.inbox = payload;
    },
  },
});
export const {login} = AuthSlice.actions;
export default AuthSlice.reducer;
