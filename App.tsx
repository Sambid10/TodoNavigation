/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import RootStack from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import HeaderSection from './src/screens/Todo/section/HeaderSection';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
      loading={null}
      persistor={persistor}
      >
        <NavigationContainer>
      <View style={styles.container}>
        <RootStack />
        <HeaderSection />
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
