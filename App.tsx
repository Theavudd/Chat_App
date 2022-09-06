import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Route from './src/routes';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/notificationServices';
import {LogBox} from 'react-native';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
}
