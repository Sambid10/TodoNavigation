import { StyleSheet, View } from 'react-native';
import MainTodoSection from './section/MainTodoSection';
import AddButton from './components/AddButton';
export type Todo = {
  id: number;
  todotitle: string;
  tododesc: string;
  isCompleted: boolean;
};
export default function Todo() {
  // const handleToggle = (id: number, val: boolean) => {
  //   settodos(
  //     todos.map(todo =>
  //       todo.id === id ? { ...todo, isCompleted: val } : todo,
  //     ),
  //   );
  // };
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
