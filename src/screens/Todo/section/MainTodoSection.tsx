import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TodoListFlatList from '../components/TodoFlatList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';

import { RootState } from '../../../redux/store';
import { loadFromStorage, setFromStorage } from '../../../redux/TodoSlice/TodoSlice';
export default function MainTodoSection() {
  const dispatch=useAppDispatch()
  useEffect(()=>{
    const loadtodos=async()=>{
      const todos=await loadFromStorage()
      dispatch(setFromStorage(todos))
    }
    loadtodos()
  },[dispatch])
  const todos = useAppSelector((state: RootState) => state.todo.todos);

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
