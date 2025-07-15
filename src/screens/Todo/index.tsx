import { StyleSheet, View } from 'react-native';
import MainTodoSection from './section/MainTodoSection';
import { useEffect, useState } from 'react';
import HeaderSection from './section/HeaderSection';
import AddTodoSection from './section/AddTodoSection';
export type Todo = {
  id: number;
  tododesc: string;
  isCompleted: boolean;
};

export default function Todo() {
  const [todos, settodos] = useState<Todo[]>([]);
  const handleTodo = (val: string, id: number) => {
    const newtodo: Todo = {
      id: id,
      tododesc: val,
      isCompleted: false,
    };
    newtodo ? settodos([...todos, newtodo]) : null;
  };

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
      <HeaderSection />
      <MainTodoSection
        todos={todos}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleEdit={handleEdit}
      />
      <AddTodoSection handleTodo={handleTodo} />
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