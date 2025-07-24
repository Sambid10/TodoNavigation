/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import RootStack from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/toastconfig/toastconfig';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged,FirebaseAuthTypes } from '@react-native-firebase/auth';
import AuthNaviagtion from './src/navigation/AuthNaviagtion';

function App() {
  const [intializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function handleAuthStateChange(user:FirebaseAuthTypes.User | null) {
    setUser(user);
    if (intializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChange);
    return subscriber;
  }, []);

  if (intializing) return null;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <View style={styles.container}>
            {!user ? (
              <AuthNaviagtion />
            ) : (
              <>
                <RootStack />
              </>
            )}

            <Toast config={toastConfig} />
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    position: 'relative',
  },
});

export default App;
