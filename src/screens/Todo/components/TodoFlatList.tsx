import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {Todo} from '..';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { KeyboardAvoidingView } from 'react-native';
export default function TodoListFlatList({
  todos,
  handleDelete,
  handleToggle,
  handleEdit,
}: {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (id: number, val: boolean) => void;
  handleEdit: (id: number, updateddesc: string) => void;
}) {
  const [editingid, setEditingid] = useState<number | null>(0);
  const [editedtext, setEditedtext] = useState<string>('');

  const onEdit = (id: number, desc: string) => {
    setEditingid(id);
    setEditedtext(desc);
  };

  const handleSave = (id: number, updateddesc: string) => {
    handleEdit(id, updateddesc);
    setEditedtext('');
    setEditingid(null);
  };
  return (
    <>
    <KeyboardAvoidingView>
        <View style={styles.todolistcontainer}>
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <View>
              <Text style={styles.maintitle}>Your Todos</Text>
            </View>
          }
          ListFooterComponent={<View style={styles.seperator} />}
          renderItem={({ item }) => (
            <>
              <View style={styles.container}>
                <View
                  style={[
                    styles.eachtodo,
                    item.isCompleted && styles.completedeachtodo,
                  ]}
                >
                  {/* todo ko maintext */}
                  <TextInput
                    editable={editingid === item.id}
                    multiline={true}
                    value={editingid === item.id ? editedtext : item.tododesc}
                    onChangeText={text => setEditedtext(text)}
                    style={[
                      styles.edittextinput,
                      item.isCompleted
                        ? styles.completedtoddesc
                        : styles.tododesc,
                    ]}
                  />
                </View>

                {/* delete button */}
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.deletebtn}
                >
                  <Image
                    style={styles.btnicon}
                    source={require('../../../assets/bin.png')}
                  />
                </TouchableOpacity>

                {/* {save ra edit ko button} */}
                {editingid === item.id ? (
                  //save btn
                  <TouchableOpacity
                    onPress={() => handleSave(item.id, editedtext)}
                    style={styles.editbtn}
                  >
                    <Text style={styles.savebtntext}>Save</Text>
                  </TouchableOpacity>
                ) : (
                  // edit btn
                  <TouchableOpacity
                    onPress={() => onEdit(item.id, item.tododesc)}
                    style={styles.editbtn}
                  >
                    <Text style={styles.editbtntext}>Edit</Text>
                  </TouchableOpacity>
                )}

                {/* checkbox to btn */}
                <BouncyCheckbox
                  fillColor="green"
                  unFillColor="white"
                  size={20}
                  style={styles.checkbox}
                  onPress={() => handleToggle(item.id, !item.isCompleted)}
                />
              </View>

              <View style={styles.seperator} />
            </>
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
  maintitle: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 12,
  },

  eachtodo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    paddingRight: 50,
    paddingLeft: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#242424',
  },
  completedeachtodo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    paddingRight: 50,
    paddingLeft: 40,
    alignItems: 'center',
    borderRadius: 12,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#242424',
    backgroundColor: '#f0fdf4',
  },
  container: {
    position: 'relative',
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