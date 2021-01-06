import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import * as Font from 'expo-font';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import Roboto_medium from 'native-base/Fonts/Roboto_medium.ttf';
import Ionicons from 'native-base/Fonts/Ionicons.ttf';
import { store, persistor } from './redux';
import Main from './Main';
import Loader from './components/UI/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Font.loadAsync({
      Roboto,
      Roboto_medium,
      Ionicons,
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </Root>
  );
}
