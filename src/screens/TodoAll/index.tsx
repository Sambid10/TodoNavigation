import {View} from "react-native";
import { StyleSheet } from "react-native";
import TodoListFlatList from "../Todo/components/TodoFlatList";
import { useAppSelector } from "../../hooks/hook";
import { RootState } from "../../redux/store";

export default function TodoAll() {
    const todo=useAppSelector((state:RootState)=>state.todos)
  return (
    <View style={styles.container}>
        <TodoListFlatList data={todo}/>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FAF7F3",
        padding:12,
    }
})