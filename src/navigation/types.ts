import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type AuthStackParamList={
  Signin: undefined,
  Signup:undefined,
}

export type RootStackParamList = {
  Home: undefined;
  AddTodo: undefined;
  TodoDetails: { todoid: number };
};

export type BottomTabParamList = {
  TabHome: undefined;
  TabHistory: undefined;
  TabProfile: undefined;
};

export type TopTabParamList = {
  TodoCompleted: undefined;
  TodoIncomplete: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomtabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type TopTabScreenProps<T extends keyof TopTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<TopTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface BottomParamList extends BottomTabParamList {}
    interface TopParamList extends TopTabParamList {}
  }
}
