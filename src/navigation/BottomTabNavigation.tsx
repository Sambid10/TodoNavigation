/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Todo from '../screens/Todo';
import Profile from '../screens/Profile';
import History from '../screens/History';
type IconName = 'TabHome' | 'TabHistory' | 'TabProfile';

const icons: Record<IconName, any> = {
  TabHome: require('../assets/home.png'),
  TabHistory: require('../assets/history.png'),
  TabProfile: require('../assets/user.png'),
};
import { Image } from 'react-native';
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        borderTopWidth: 1,
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
            <Image
              source={icons[route.name as IconName]}
              style={{
                width: 24,
                height: 24,
                tintColor: isFocused ? '#fff' : 'black',
                marginBottom: 4,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: isFocused ? 'bold' : 'normal',
                fontSize: 12,
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

export function BottomTabs() {
  return (
    <Tab.Navigator 
    tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="TabHome"
        component={Todo}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="TabHistory"
        component={History}
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen
        name="TabProfile"
        component={Profile}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
