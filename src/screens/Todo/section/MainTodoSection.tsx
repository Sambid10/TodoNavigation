import React from 'react';
import { View, StyleSheet } from 'react-native';
import TodoListFlatList from '../components/TodoFlatList';
export default function MainTodoSection() {
  return (
    <View style={styles.scrollviewcontainer}>
      <TodoListFlatList />
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
