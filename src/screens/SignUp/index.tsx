/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SocialInput from './components/SocialInput';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { useAppDispatch } from '../../hooks/hook';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import {
  createNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
type SignupScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export const navigationRef = createNavigationContainerRef();
export default function SignUpScreen() {
  const navigation = useNavigation<SignupScreenProp>();
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [repeatpass, setrepeatpass] = useState('');
  const [errormessage, setErrormessage] = useState('');
  const disptach = useAppDispatch();
  const handleEmail = (val: string) => {
    setemail(val);
  };
  const handlePassword = (val: string) => {
    setpassword(val);
  };
  const reapeathandlePassword = (val: string) => {
    setrepeatpass(val);
  };
  const onSignupPress = () => {
    console.log(email, password);
    setLoading(true);
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      repeatpass.trim() === ''
    ) {
      disptach(
        notification({
          message: 'Fill in your details..',
          type: 'customerror',
          messagetitle: 'Empty Credentials!!',
        }),
      );
      setLoading(false);
    } else if (repeatpass !== password) {
      setErrormessage('Password dont match..');
      setLoading(false);
    } else {
      setErrormessage('');
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          console.log('user added!!');
          disptach(
            notification({
              message: 'User signed in..',
              type: 'customsuccess',
              messagetitle: 'Success!!',
            }),
          );
        })
        .catch((err: FirebaseAuthTypes.NativeFirebaseAuthError) => {
          if (err.code === 'auth/email-already-in-use') {
            disptach(
              notification({
                message: 'Email already in use.',
                messagetitle: 'Error!!',
                type: 'customerror',
              }),
            );
          }
          if (err.code === 'auth/invalid-email') {
            disptach(
              notification({
                message: 'Invalid email.',
                messagetitle: 'Error!!',
                type: 'customerror',
              }),
            );
          }
          if (err.code === 'auth/weak-password') {
            disptach(
              notification({
                message: 'Weak password.',
                messagetitle: 'Error!!',
                type: 'customerror',
              }),
            );
          }
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up.</Text>

      <View style={styles.textinputcontainer}>
        <SocialInput
          handleValue={handleEmail}
          placeholder="Enter your email."
          label="Email"
        />
        <SocialInput
          handleValue={handlePassword}
          placeholder="Enter your password."
          password={true}
          showicon={true}
          label="Password"
        />
        <SocialInput
          handleValue={reapeathandlePassword}
          placeholder="Re-enter your password."
          password={true}
          showicon={true}
          label="Repeat Password"
        />
        {errormessage && (
          <Text
            style={{ color: 'red', textTransform: 'capitalize', fontSize: 15 }}
          >
            {errormessage}
          </Text>
        )}

        <TouchableOpacity
          disabled={loading}
          onPress={onSignupPress}
          style={styles.loginbtn}
        >
          {loading ? (
            <ActivityIndicator
            color={"white"}
            />
          ) : (
            <Text style={styles.btntitle}>Sign up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linkcontainer}>
          <Text style={styles.linktext}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.maintext}>Sign in here..</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF7F3',
  },

  title: {
    fontSize: 42,
    marginBottom: 32,
    color: '#27548A',
    fontWeight: '500',
  },
  textinputcontainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '80%',
  },
  loginbtn: {
    backgroundColor: '#27548A',
    borderRadius: 99,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  btntitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  seperator: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    color: '#27548A',
    fontSize: 14,
  },
  linkcontainer: {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'row',
  },

  linktext: {
    color: 'gray',
  },
  maintext: {
    color: '#27548A',
    fontWeight: '600',
  },
});
