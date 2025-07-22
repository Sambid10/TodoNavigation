import { StyleSheet, View } from 'react-native';
import TodoListFlatList from '../Todo/components/TodoFlatList';
import { useAppSelector } from '../../hooks/hook';
import { RootState } from '../../redux/store';

export default function TodoCompleted() {
  const todos = useAppSelector((state: RootState) => state.todo.todos);
  const completedTodos = todos.filter(todo => todo.isCompleted);
  return (
    <View style={styles.container}>
      <TodoListFlatList data={completedTodos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F3',
    padding: 12,
  },
});
