import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodoListFlatList from '../components/TodoFlatList';
import { useAppSelector } from '../../../hooks/hook';

import { RootState } from '../../../redux/store';
export default function MainTodoSection() {
  const todos = useAppSelector((state: RootState) => state.todos);
  return (
    <View style={styles.scrollviewcontainer}>
      <TodoListFlatList data={todos} />
    </View>
  );
}
const styles = StyleSheet.create({
  scrollviewcontainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 20,
    paddingBottom: 20,
    position: 'relative',
  },
});
