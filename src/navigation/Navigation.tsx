/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoDetails from '../screens/TodoDetails';
import AddTodo from '../screens/AddTodo';
import { RootStackParamList } from './types';
import { BottomTabs } from './BottomTabNavigation';
import HeaderSection from '../screens/Todo/section/HeaderSection';
import ProfileEdit from '../screens/ProfileEdit';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {

  return (

    <Stack.Navigator
      screenOptions={{ header: () => <HeaderSection /> }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="TodoDetails" component={TodoDetails} />
    </Stack.Navigator>
  );
}
