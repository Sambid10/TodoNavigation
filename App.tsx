/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View } from 'react-native';
import Todo from './src/screens/Todo';

function App() {
  return (
    <View style={styles.container}>
        <Todo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#efefef"
  },
});

export default App;
