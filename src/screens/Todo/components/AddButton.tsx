/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

type AddTodoScreenProp=NativeStackNavigationProp<RootStackParamList,"AddTodo">
export default function AddButton() {
      const navigation = useNavigation<AddTodoScreenProp>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>navigation.navigate("AddTodo")}
      style={styles.btncontainer}>
        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  btncontainer: {
    height: 60,
    width: 60,
    borderRadius: 99,
    backgroundColor: '#27548A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
