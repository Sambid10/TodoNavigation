import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import { AuthStackParamList } from "./types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthNaviagtion() {
  return (
    <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="Signin"
       >
         <Stack.Screen name="Signin" component={SignInScreen} />
         <Stack.Screen name="Signup" component={SignUpScreen} />
       </Stack.Navigator>
  )
}
