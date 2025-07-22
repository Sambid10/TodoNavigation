import { StyleSheet, View } from 'react-native';
import TodoListFlatList from '../Todo/components/TodoFlatList';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../hooks/hook';
export default function TodoIncomplete() {
  const todos = useAppSelector((state: RootState) => state.todo.todos);
  const incompletetodos = todos.filter(todo => todo.isCompleted === false);
  return (
    <View style={styles.container}>
      <TodoListFlatList data={incompletetodos} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FAF7F3',
  },
});
