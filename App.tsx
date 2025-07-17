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
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
       <NavigationContainer>
      <View style={styles.container}>
        <RootStack />
        <HeaderSection />
      </View>
    </NavigationContainer>
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
