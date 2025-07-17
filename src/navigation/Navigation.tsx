import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoDetails from "../screens/TodoDetails";
import AddTodo from "../screens/AddTodo";
import { RootStackParamList } from "./types";
import { BottomTabs } from "./BottomTabNavigation";
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name='TodoDetails' component={TodoDetails}/>
    </Stack.Navigator>
  );
}
