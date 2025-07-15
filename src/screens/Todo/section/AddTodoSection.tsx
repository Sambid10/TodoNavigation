import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function AddTodoSection({
  handleTodo,
}: {
  handleTodo: (val: string, id: number) => void;
}) {
  const [eachtodo, seteachtodo] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const handleClick = () => {
    if (eachtodo){
    handleTodo(eachtodo, Math.random());}
    else null
    seteachtodo('');
    inputRef.current?.blur();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.todoaddcontainer}>
        <View style={styles.todoaddcontainerwrapper}>
          <TextInput
            onChangeText={text => seteachtodo(text)}
            placeholderTextColor="#393E46"
            placeholder="Add your new todo.."
            style={styles.textInput}
            value={eachtodo}
            ref={inputRef}
          />

          <TouchableOpacity 
          onPress={handleClick} style={styles.todoaddbtn}>
            <Text style={styles.todobtntext}>Add</Text>
          </TouchableOpacity>


        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
// FAF7F3"
const styles = StyleSheet.create({
  todoaddcontainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    padding:12,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 80,
    alignItems: 'center',
    backgroundColor:"#F9F3EF",
    borderTopWidth:StyleSheet.hairlineWidth,
    borderTopColor:"gray"
  },
  todoaddcontainerwrapper: {
    flexDirection: 'row',
    display:"flex",
    gap:8,
    justifyContent:"space-between"
  },
  textInput: {
    borderWidth: 1,
    width:"80%",
    borderRadius: 12,
    borderColor: '#242424',
    height: 54,
    paddingLeft: 14,
    color: 'black',
    backgroundColor: '#fff',
    shadowColor: '#393E46',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 4,
  },

  todoaddbtn: {
    backgroundColor: '#27548A',
    height: 54,
    borderRadius: 12,
    paddingRight:14,
    paddingLeft:14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todobtntext: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});