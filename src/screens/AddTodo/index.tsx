/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextInputComponent from './Components/TextInput';
import { useState } from 'react';
import { Todo } from '../Todo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// import { addTodo } from '../../redux/TodoSlice/TodoSlice';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import DatePickerComponent from './Components/DatePicker';
type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function AddTodo() {
  const navigation = useNavigation<HomeScreenProp>();
  const [title, settile] = useState<string>('');
  const [desc, setdesc] = useState<string>('');
  const [date, setDate] = useState(new Date())
  const [loading, setloading] = useState(false);
  const auth = getAuth();
  const userid= auth.currentUser!.uid 
  const dispatch = useDispatch();
  const handleTitle = (val: string) => {
    settile(val);
  };
  const handleDesc = (val: string) => {
    setdesc(val);
  };
  const handleDate =(val:Date)=>{
    setDate(val)
  }
  const handlePress = () => {
    setloading(true);
    if (!title.trim() && !desc.trim() ) {
      setloading(false)
      return;
    } else {
      const newTodo: Todo = {
        tododesc: desc,
        todotitle: title,
        isCompleted: false,
        id: Math.random(),
        userid:userid,
        datetime:firestore.Timestamp.fromDate(date)
      };
      firestore()
        .collection('todos')
        .add(newTodo)
        .then(() => {
          console.log('from db');
          // dispatch(addTodo(newTodo));
          dispatch(
            notification({
              message: 'Todo Added successfully',
              type: 'customsuccess',
              messagetitle: 'Success!!',
            }),
          );
          navigation.navigate('Home',{screen:"TabHome"});
        })
        .catch(err => console.log(err))
        .finally(() => setloading(false));
    }
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>Add your todo</Text>
      <View>
        <TextInputComponent
          handleValue={handleTitle}
          formlabel={'Todo Title'}
          inputplaceholder={'Enter title'}
        />
      </View>

      <View>
        <TextInputComponent
          handleValue={handleDesc}
          formlabel={'Todo Description'}
          inputplaceholder={'Enter description'}
          multiline={true}
        />
      </View>
      
      <DatePickerComponent disabled={false} label={"Pick your deadline date"} date={date} setDate={handleDate}/>

      <View style={styles.btncontainer}>
        <TouchableOpacity
          disabled={loading}
          onPress={handlePress}
          style={styles.btn}
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FAF7F3',
    marginTop: 70,
    padding: 12,
    display: 'flex',
    gap: 16,
  },
  btncontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#27548A',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 100,
  },
});
