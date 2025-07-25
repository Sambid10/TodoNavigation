/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoDetails from '../screens/TodoDetails';
import AddTodo from '../screens/AddTodo';
import { RootStackParamList } from './types';
import { BottomTabs } from './BottomTabNavigation';
import HeaderSection from '../screens/Todo/section/HeaderSection';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{header:()=><HeaderSection/>}}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_bottom',
          }}
          name="AddTodo"
          component={AddTodo}
        />
      </Stack.Group>

      {/* <Stack.Screen name="" component={} /> */}
      <Stack.Screen name="TodoDetails" component={TodoDetails} />
    </Stack.Navigator>
  );
}
