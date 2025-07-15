/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import Todo from './src/screens/Todo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HeaderSection from './src/screens/Todo/section/HeaderSection';
import { RootStackParamList } from './src/navigation/types';
import AddTodo from './src/screens/AddTodo';
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Todo} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <RootStack />
        <HeaderSection />
      </View>
    </NavigationContainer>
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
