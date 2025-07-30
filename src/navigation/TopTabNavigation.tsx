/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import TodoCompleted from '../screens/TodoCompleted';
import TodoIncomplete from '../screens/TodoIncomplete';
import TodoAll from '../screens/TodoAll';
const Tab = createMaterialTopTabNavigator();

import {  View, TouchableOpacity} from 'react-native';
import { Text } from 'react-native';
function MyTabBar({ state, descriptors, navigation}:MaterialTopTabBarProps) {
  return (
     <View
          style={{
            flexDirection: 'row',
            height: 55,
            borderBottomWidth: 1,
            borderColor: 'gray',
            backgroundColor: '#F9F3EF',
        
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderTopColor: 'gray',
                  borderWidth: 0,
                  backgroundColor: isFocused ? '#27548A' : '#F9F3EF',
                }}
              >
                <Text
                  style={{
                    fontWeight: isFocused ? 'bold' : 'normal',
                    fontSize: 15,
                    color: isFocused ? '#fff' : 'black',
                  }}
                >
                  {label as string}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
  );
}

export function MyTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
         <Tab.Screen name="All" component={TodoAll} options={{tabBarLabel:"All"}}/>
      <Tab.Screen name="TodoCompleted" component={TodoCompleted} options={{tabBarLabel:"Completed"}}/>
      <Tab.Screen name="TodoIncomplete" component={TodoIncomplete} options={{tabBarLabel:"Incomplete"}}/>
    </Tab.Navigator>
  );
}