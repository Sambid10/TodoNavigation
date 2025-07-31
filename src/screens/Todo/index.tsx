import { StyleSheet, View } from 'react-native';
import MainTodoSection from './section/MainTodoSection';
import AddButton from './components/AddButton';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Todo = {
  id: number;
  todotitle: string;
  tododesc: string;
  isCompleted: boolean;
  userid: string;
  datetime: FirebaseFirestoreTypes.Timestamp; 
};
export default function Todo() {
  return (
    <View style={styles.maincontainer}>
      <MainTodoSection />
      <AddButton />
    </View>
  );
}
export const styles = StyleSheet.create({
  maincontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FAF7F3',
  },
});


