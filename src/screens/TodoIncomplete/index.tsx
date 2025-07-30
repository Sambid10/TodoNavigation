import { StyleSheet, View } from 'react-native';
import TodoListFlatList from '../Todo/components/TodoFlatList';
import { useEffect, useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { Todo } from '../Todo';
export default function TodoIncomplete() {
  const [loading, setloading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const auth = getAuth();
  const userid = auth.currentUser!.uid;
  useEffect(() => {
    setloading(true);
    const loadTodos = async () => {
      try {
        const snapshot = await firestore()
          .collection('todos')
          .where('userid', '==', userid)
          .where('isCompleted', '==', false)
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
    <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: '#FAF7F3',
    padding: 12,
  },
  maintitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 12,
  },
});
