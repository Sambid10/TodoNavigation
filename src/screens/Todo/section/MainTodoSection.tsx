import React from 'react';
import { View, StyleSheet} from 'react-native';
// import TodoList from '../TodoComponents/TodoList';
import { Todo } from '..';
import TodoListFlatList from '../components/TodoFlatList';
export default function MainTodoSection({
  todos,
  handleDelete,
  // handleToggle,
  // handleEdit,
}: {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (id: number, val: boolean) => void;
  handleEdit: (id: number, updateddesc: string) => void;
}) {
  return (
    <View style={styles.scrollviewcontainer}>
      <TodoListFlatList
        todos={todos}
        handleDelete={handleDelete}
        // handleToggle={handleToggle}
        // handleEdit={handleEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollviewcontainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 70,
    marginBottom: 80,
    position: 'relative',
  },
});
