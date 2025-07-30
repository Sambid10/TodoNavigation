/* eslint-disable react-native/no-inline-styles */
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useAppDispatch } from '../../../hooks/hook';
// import { handleDelete } from '../../../redux/TodoSlice/TodoSlice';
import { RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Todo } from '..';
import { notification } from '../../../redux/NotificationSlice/NotificationSlice';
import firestore from '@react-native-firebase/firestore';
export default function TodoListFlatList({
  data,
  userid,
}: {
  data: Todo[];
  userid: string;
}) {
  type TodoDetailsProp = NativeStackNavigationProp<
    RootStackParamList,
    'TodoDetails'
  >;
  const navigation = useNavigation<TodoDetailsProp>();
  const disptach = useAppDispatch();
  const handleTodoDelete = async (id: number) => {
    const collection = firestore().collection('todos');
    const ids = (
      await collection.where('id', '==', id).where('userid', '==', userid).get()
    ).docs.map(doc => doc.id);
    await collection
      .doc(ids[0])
      .delete()
      .then(() => {
        // disptach(handleDelete(id));
        disptach(
          notification({
            message: 'Deleted Successfully',
            type: 'customsuccess',
            messagetitle: 'Success!!',
          }),
        );
      });
      navigation.replace("Home")
  };

  return (
    <>
      <KeyboardAvoidingView>
        <View style={styles.todolistcontainer}>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={<View style={styles.seperator} />}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TodoDetails', { todoid: item.id ,todo:item})
                  }
                  style={styles.container}
                >
                  <View
                    style={[
                      styles.eachtodo,
                      item.isCompleted && styles.completedeachtodo,
                    ]}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxWidth: '60%',
                      }}
                    >
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{ color: 'gray' }}
                      >
                        Title:{' '}
                      </Text>
                      <Text>{item.todotitle}</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxWidth: '60%',
                      }}
                    >
                      <Text style={{ color: 'gray' }}>Description: </Text>
                      <Text ellipsizeMode="tail" numberOfLines={1}>
                        {item.tododesc}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        maxWidth: '60%',
                      }}
                    >
                      {item.isCompleted && (
                        <Text style={{ color: 'green' }}>
                          &#x2713; Completed{' '}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Delete button */}
                  <TouchableOpacity
                    onPress={() => handleTodoDelete(item.id)}
                    style={styles.deletebtn}
                  >
                    <Image
                      style={styles.btnicon}
                      source={require('../../../assets/bin.png')}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.seperator} />
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  todolistcontainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
 

  eachtodo: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 12,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#242424',
    gap: 2,
  },
  completedeachtodo: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    alignItems: 'flex-start',
    borderRadius: 12,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#242424',
    backgroundColor: '#f0fdf4',
  },
  container: {
    position: 'relative',
    width: '100%',
  },
  deletebtn: {
    position: 'absolute',
    right: 8,
    top: '50%',
    zIndex: 20,
    transform: [{ translateY: '-50%' }],
  },
  editbtn: {
    position: 'absolute',
    right: 52,
    top: '50%',
    zIndex: 20,
    transform: [{ translateY: '-50%' }],
  },
  checkbox: {
    position: 'absolute',
    left: 8,
    top: '50%',
    height: '100%',
    width: 'auto',
    zIndex: 10,
    transform: [{ translateY: '-50%' }],
  },
  editbtntext: {
    fontSize: 15,
    color: 'green',
    padding: 12,
  },
  btnicon: {
    height: 32,
    width: 32,
  },
  savebtntext: {
    color: '#27548A',
    padding: 12,
    fontSize: 15,
  },
  tododesc: {
    fontSize: 17,
  },
  completedtoddesc: {
    fontSize: 17,
    textDecorationLine: 'line-through',
  },
  edittextinput: {
    color: 'black',
    width: '80%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  seperator: {
    height: 18,
  },
});
