
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TodoListFlatList from '../components/TodoFlatList';
import { Text } from 'react-native';
// import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
// import { RootState } from '../../../redux/store';
import firestore from '@react-native-firebase/firestore';
// import type { Todo } from '..';
import { useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
import { Todo } from '..';
import { ActivityIndicator } from 'react-native';
export default function MainTodoSection() {
  // const dispatch = useAppDispatch();
  const auth = getAuth();
  const userid = auth.currentUser!.uid;
  const [loading, setloading] = useState(false);
  // const todosfromredux = useAppSelector((state: RootState) => state.todo.todos);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    setloading(true);
    const loadTodos = async () => {
      // if (todos.length === 0) {
      //   const localTodos = await loadFromStorage();
      //   if (localTodos.length > 0) {
      //     dispatch(setFromStorage(localTodos));
      //     setTodos(todosfromredux);
      //   } else {
      //     const snapshot = await firestore().collection('todos').get();
      //     const firestoreTodos: Todo[] = snapshot.docs.map(doc => ({
      //       ...(doc.data() as Todo),
      //     }));
      //     setTodos(firestoreTodos);
      //   }
      // }
      // const snapshot = await firestore().collection('todos').get();
      // const firestoreTodos: Todo[] = snapshot.docs.map(doc => ({
      //   ...(doc.data() as Todo),
      // }));
      // setTodos(firestoreTodos)
      try {
        const snapshot = await firestore()
          .collection('todos')
          .where('userid', '==', userid)
          .get();
        const firebasetodos = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as Todo[];
        setTodos(firebasetodos);
      } catch (error) {
        console.error('fetching ma error', error);
      } finally {
        setloading(false);
      }
    };
    loadTodos();
  }, [userid]);

  return (
    <View style={styles.scrollviewcontainer}>
      <Text style={styles.maintitle}>Your Todos</Text>
      {loading ? (
        <ActivityIndicator color={'#27548A'} />
      ) : (
        <>
          <TodoListFlatList data={todos} userid={userid} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollviewcontainer: {
    padding:12,
    position: 'relative',
  },
   maintitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 12,
  },
});
