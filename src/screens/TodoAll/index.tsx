import {View} from "react-native";
import { StyleSheet } from "react-native";
import MainTodoSection from "../Todo/section/MainTodoSection";
export default function TodoAll() {
  return (
    <View style={styles.container}>
       <MainTodoSection/>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FAF7F3",
    }
})