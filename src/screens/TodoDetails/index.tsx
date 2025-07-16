/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { getTodobyId, handleEdit, handleTodoComplete } from '../../redux/TodoSlice/TodoSlice';
import { TextInput } from 'react-native';
type TodoDetailsProp = RouteProp<RootStackParamList, 'TodoDetails'>;
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type HomeProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export default function TodoDetails() {
  const route = useRoute<TodoDetailsProp>();
  const navigation = useNavigation<HomeProp>();
  const todo = useAppSelector(state => state.selectedtodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodobyId(route.params.todoid));
  }, [route.params?.todoid, dispatch]);
  const todoid = route.params.todoid;
  const [editable, setEditable] = useState(false);
  const [editedtitle, setEditedtitle] = useState('');
  const [editeddesc, setEditeddesc] = useState('');
  const OnEdit = () => {
    setEditable(prev => !prev);
    setEditedtitle(todo!.todotitle);
    setEditeddesc(todo!.tododesc);
  };
  const OnSave = () => {
    dispatch(
      handleEdit({ id: todoid, title: editedtitle, description: editeddesc }),
    );
    navigation.navigate('Home');
  };

  const onComplete=(isChecked:boolean)=>{
    dispatch(
        handleTodoComplete({ id:todoid,completed:isChecked})
    )
  }
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
            value={editable ? editedtitle : todo?.todotitle}
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
            value={editable ? editeddesc : todo?.tododesc}
            placeholderTextColor={'#9CA3AF'}
          />
        </View>
      </View>
      <View style={styles.btncontainer}>
        <BouncyCheckbox
          size={30}
          fillColor={"green"}
          isChecked={todo?.isCompleted}
          unFillColor="#FFFFFF"
          textComponent={<TextComponent />}
          innerIconStyle={{ borderWidth: 1 }}
          textStyle={{ color: 'black', fontSize: 12 }}
          onPress={(isChecked: boolean) => {
                onComplete(isChecked)
          }}
          
        />
        {!editable ? (
          <TouchableOpacity onPress={OnEdit} style={styles.btn}>
            <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={OnSave} style={styles.btn}>
            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const TextComponent = () => {
  return (
    <View>
      <Text style={{fontSize:16,marginLeft:4}}>Completed</Text>
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
    marginTop: 75,
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
