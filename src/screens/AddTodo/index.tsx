/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextInputComponent from './Components/TextInput';
import { useState } from 'react';
import { Todo } from '../Todo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList} from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/TodoSlice/TodoSlice';

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function AddTodo() {
  const navigation = useNavigation<HomeScreenProp>();
  const [title, settile] = useState<string>('');
  const [desc, setdesc] = useState<string>('');
  const dispatch=useDispatch()
  const handleTitle = (val: string) => {
    settile(val);
  };
  const handleDesc = (val: string) => {
    setdesc(val);
  };

  const handlePress = () => {
    if(!title.trim() || !desc.trim()){
      return
    }else{
    const newTodo: Todo = {
      tododesc: desc,
      todotitle: title,
      isCompleted: false,
      id: Math.random(),
    };
    dispatch(addTodo(newTodo))
    navigation.navigate('Home');
  }
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>
        Add your todo
      </Text>
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

      <View style={styles.btncontainer}>
        <TouchableOpacity onPress={handlePress} style={styles.btn}>
          <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
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
    marginTop: 60,
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
  },
});
