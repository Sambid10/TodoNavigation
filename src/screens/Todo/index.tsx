import { StyleSheet, View } from 'react-native';
import MainTodoSection from './section/MainTodoSection';
import { useEffect, useState } from 'react';
import AddButton from './components/AddButton';
export type Todo = {
  id: number;
  todotitle: string;
  tododesc: string;
  isCompleted: boolean;
};
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
export default function Todo() {
  const route = useRoute<HomeRouteProp>();
  const [todos, settodos] = useState<Todo[]>([]);
  // const handleTodo = (todotitle: string,tododesc:string, id: number) => {
  //   const newtodo: Todo = {
  //     id: id,
  //     tododesc,
  //     todotitle,
  //     isCompleted: false,
  //   };
  //   newtodo ? settodos([...todos, newtodo]) : null;
  // };

  useEffect(() => {
    if (route.params?.todo) {
      settodos(prev => [...prev, route.params.todo]);
    }
  }, [route.params?.todo]);
  const handleToggle = (id: number, val: boolean) => {
    settodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: val } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    settodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number, updateddesc: string) => {
    settodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, tododesc: updateddesc } : todo,
      ),
    );
  };

  useEffect(() => {
    console.log(todos);
  }, [todos, settodos]);

  return (
    <View style={styles.maincontainer}>
      <MainTodoSection
        todos={todos}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleEdit={handleEdit}
      />
      <AddButton />
      {/* <AddTodoSection handleTodo={handleTodo} /> */}
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
