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
import {isValidEmail, isValidPass} from '../../regex';
type SignupScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export const navigationRef = createNavigationContainerRef();

export default function SignUpScreen() {
  const navigation = useNavigation<SignupScreenProp>();
  const disptach = useAppDispatch();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [repeatpass, setrepeatpass] = useState('');

  // error messages ko state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleEmail = (val: string) => setemail(val);
  const handlePassword = (val: string) => setpassword(val);
  const handleRepeatPassword = (val: string) => setrepeatpass(val);



  const onSignupPress = () => {
    setEmailError('');
    setPasswordError('');
    setRepeatPasswordError('');
    setLoading(true);

    // Empty check
    if (!email.trim() || !password.trim() || !repeatpass.trim()) {
      disptach(
        notification({
          message: 'Fill in your details..',
          type: 'customerror',
          messagetitle: 'Empty Credentials!!',
        }),
      );
      setLoading(false);
      return;
    }

    if (password !== repeatpass) {
      setRepeatPasswordError('Passwords do not match.');
      setLoading(false);
      return;
    }

    let hasError = false;
    if (!isValidEmail(email)) {
      setEmailError('Invalid email format.');
      hasError = true;
    }
    if (!isValidPass(password)) {
      setPasswordError('Password must contain 1 capital letter & length > 6.');
      hasError = true;
    }
    if (hasError) {
      setLoading(false);
      return;
    }

    // Signup
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
        let message = 'Something went wrong.';
        if (err.code === 'auth/email-already-in-use') {
          message = 'Email already in use.';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Invalid email.';
        } else if (err.code === 'auth/weak-password') {
          message = 'Weak password.';
        }

        disptach(
          notification({
            message,
            messagetitle: 'Error!!',
            type: 'customerror',
          }),
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up.</Text>

      <View style={styles.textinputcontainer}>
        <SocialInput
          handleValue={handleEmail}
          placeholder="Enter your email."
          label="Email"
          error={emailError}
        />
        {emailError && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <SocialInput
          handleValue={handlePassword}
          placeholder="Enter your password."
          password
          showicon
          label="Password"
          error={passwordError}
        />
        {passwordError && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <SocialInput
          handleValue={handleRepeatPassword}
          placeholder="Re-enter your password."
          password
          showicon
          label="Repeat Password"
          error={repeatPasswordError}
        />
        {repeatPasswordError && (
          <Text style={styles.errorText}>{repeatPasswordError}</Text>
        )}

        <TouchableOpacity
          disabled={loading}
          onPress={onSignupPress}
          style={styles.loginbtn}
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
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
  errorText: {
    color: '#d44118ff',
    fontSize: 12,
    marginTop: -5,
  },
});
