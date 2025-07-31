/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hook';
import { TextInput } from 'react-native';
import { ActivityIndicator } from 'react-native';
import DatePickerComponent from '../AddTodo/Components/DatePicker';
import { scheduleNotification } from '../../notification/notificationTrigger';
// import {
//   getTodobyId,
//   handleEdit,
//   handleTodoComplete,
// } from '../../redux/TodoSlice/TodoSlice';
// import { TextInput } from 'react-native';
type TodoDetailsProp = RouteProp<RootStackParamList, 'TodoDetails'>;
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import firestore from '@react-native-firebase/firestore';
type HomeProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export default function TodoDetails() {
  const route = useRoute<TodoDetailsProp>();
  const navigation = useNavigation<HomeProp>();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   // dispatch(getTodobyId(route.params.todoid));
  // }, [route.params?.todoid, dispatch]);
  // const todo = useAppSelector(state => state.todo.selectedtodo);
  const todoid = route.params.todoid;
  const [editable, setEditable] = useState(false);
  const [editedtitle, setEditedtitle] = useState('');
  const [editeddesc, setEditeddesc] = useState('');
  const [editedtimestamp,seteditedtimestamp]=useState(new Date())
  const [loading, setloading] = useState(false);

const OnSave = async () => {
  setloading(true);
  try {
    const collection = firestore().collection('todos');
    const snapshot = await collection.where('id', '==', todoid).get();
    if (snapshot.empty) {
      dispatch(
        notification({
          message: 'Todo not found',
          messagetitle: 'Error!',
          type: 'customerror',
        }),
      );
      return;
    }
    const docId = snapshot.docs[0].id;
    const docIdToNumber=Number(docId) 
    await collection.doc(docId).update({
      todotitle: editedtitle,
      tododesc: editeddesc,
      datetime: firestore.Timestamp.fromDate(editedtimestamp),
    });
    await scheduleNotification(editedtitle, editedtimestamp,docIdToNumber,route.params.todo);
    dispatch(
      notification({
        message: 'Todo edited and rescheduled!',
        messagetitle: 'Success!!',
        type: 'customsuccess',
      }),
    );

    navigation.navigate('Home', { screen: 'TabHome' });
  } catch (err) {
    console.error('Error saving todo:', err);
  } finally {
    setloading(false);
  }
};


  const onComplete = async (isChecked: boolean) => {
    const collection = firestore().collection('todos');
    const ids = (await collection.where('id', '==', todoid).get()).docs.map(
      doc => doc.id,
    );
    await collection
      .doc(ids[0])
      .update({
        isCompleted: isChecked,
      })
      .then(() => {
        // dispatch(handleTodoComplete({ id: todoid, completed: isChecked }));
        dispatch(
          notification({
            message: 'Edited successfully',
            messagetitle: 'Success!!',
            type: 'customsuccess',
          }),
        );
        navigation.navigate('Home', { screen: 'TabHome' });
      })
      .catch(err => console.log(err));
  };

  const OnEdit = () => {
    setEditable(true);
    setEditedtitle(route.params.todo.todotitle);
    setEditeddesc(route.params.todo.tododesc);
    seteditedtimestamp(route.params.todo.datetime.toDate())
  };
  return (
    <View style={styles.maincontainer}>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>Todo Details.</Text>
      <View style={{ display: 'flex', gap: 16 }}>
        <View style={styles.eachformfield}>
          <Text>Todo Title</Text>
          <TextInput
            onChangeText={text => setEditedtitle(text)}
            editable={editable}
            style={[
              styles.input,
              {
                minHeight: 50,
                textAlignVertical: 'center',
              },
            ]}
            value={editable ? editedtitle : route.params.todo.todotitle}
            placeholderTextColor={'#9CA3AF'}
          />
        </View>
        <View style={styles.eachformfield}>
          <Text>Todo Description</Text>
          <TextInput
            onChangeText={text => setEditeddesc(text)}
            editable={editable}
            style={[
              styles.input,
              {
                minHeight: 100,
                textAlignVertical: 'top',
              },
            ]}
            multiline={true}
            value={editable ? editeddesc : route.params.todo.tododesc}
            placeholderTextColor={'#9CA3AF'}
          />
        </View>
        <View style={styles.eachformfield}>
          <DatePickerComponent
            disabled={!editable}
            date={editable ? editedtimestamp : route.params.todo.datetime!.toDate()}
            label={'Todo Deadline date'}
            setDate={seteditedtimestamp}
          />
        </View>
      </View>
      <View style={styles.btncontainer}>
        <BouncyCheckbox
          size={30}
          fillColor={'green'}
          isChecked={route.params.todo.isCompleted}
          unFillColor="#FFFFFF"
          textComponent={<TextComponent />}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ color: 'black', fontSize: 12 }}
          onPress={(isChecked: boolean) => {
            onComplete(isChecked);
          }}
        />
        {!editable ? (
          <TouchableOpacity onPress={OnEdit} style={styles.btn}>
            <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={OnSave} style={styles.btn}>
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const TextComponent = () => {
  return (
    <View>
      <Text style={{ fontSize: 16, marginLeft: 4 }}>Completed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FAF7F3',
    marginTop: 70,
    padding: 12,
  },
  input: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#121212',
    paddingLeft: 12,
    height: 50,
    color: 'black',
    backgroundColor: 'white',
  },
  eachformfield: {
    display: 'flex',
    gap: 6,
  },
  btncontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#27548A',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
