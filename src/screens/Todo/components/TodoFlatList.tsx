import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Todo } from '..';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
export default function TodoListFlatList({
  todos,
  handleDelete,
}: //   handleEdit,
//   handleToggle
{
  todos: Todo[];
  handleDelete: (id: number) => void;
  //   handleToggle: (id: number, val: boolean) => void;
  //   handleEdit: (id: number, updateddesc: string) => void;
}) {
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
              <View>
                <View style={styles.container}>
                  <View
                    style={[
                      styles.eachtodo,
                      item.isCompleted && styles.completedeachtodo,
                    ]}
                  >
                    <Text>{item.todotitle}</Text>
                  </View>

                  {/* Delete button */}
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.deletebtn}
                  >
                    <Image
                      style={styles.btnicon}
                      source={require('../../../assets/bin.png')}
                    />
                  </TouchableOpacity>
                </View>
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
    paddingTop: 20,
    paddingBottom: 20,
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
