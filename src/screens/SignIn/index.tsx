/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SocialInput from '../SignUp/components/SocialInput';
import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useAppDispatch } from '../../hooks/hook';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { isValidEmail } from '../../regex';
import SocialButton from '../../_components/SocialSignButton';
import { onGoogleButtonPress } from '../../hooks/onGoogleButtonPress';
type SigninScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Signin'>;
export default function SignInScreen() {
  const navigation = useNavigation<SigninScreenProp>();

  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState('');
  const [emailerrormessage, setemailerrormessage] = useState('');
  const [password, setpassword] = useState('');
  const disptach = useAppDispatch();

  const handleEmail = (val: string) => {
    setemail(val);
  };
  const handlePassword = (val: string) => {
    setpassword(val);
  };

  const onSignupPress = () => {
    setLoading(true);
    setemailerrormessage('');
    if (email.trim() === '' || password.trim() === '') {
      disptach(
        notification({
          message: 'Fill in your details..',
          type: 'customerror',
          messagetitle: 'Empty Credentials!!',
        }),
      );
      setLoading(false);
    } else if (!isValidEmail(email)) {
      setemailerrormessage('Invalid email format.');
      setLoading(false);
    } else {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          console.log('Logged in !!');
          disptach(
            notification({
              message: 'User signed in..',
              type: 'customsuccess',
              messagetitle: 'Success!!',
            }),
          );
        })
        .catch(err => {
          if (err.code === 'auth/invalid-email') {
            disptach(
              notification({
                message: 'Invalid email.',
                messagetitle: 'Error!!',
                type: 'customerror',
              }),
            );
          }
          if (err.code === 'auth/invalid-credential') {
            disptach(
              notification({
                message: 'Invalid credentials for email/password.',
                messagetitle: 'Error!!',
                type: 'customerror',
              }),
            );
          }
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in.</Text>

      <View style={styles.textinputcontainer}>
        <SocialButton
          urlpath={require('../../assets/google.png')}
          title="Sign in with Google"
          onPress={async () => {
            try {
              const userCredential = await onGoogleButtonPress();
              console.log('Signed in with Google!', userCredential);
            } catch (err: any) {
              console.log('❌ Google sign-in error');
              console.log('Code:', err.code);
              console.log('Message:', err.message);
              console.log('Stack:', err.stack);
              console.log('Full error:', JSON.stringify(err, null, 2));
            }
          }}
        />
        <View style={{ position: 'relative', height: 20 }}>
          <Text
            style={{
              position: 'absolute',
              left: '48%',
              zIndex: 50,
              paddingLeft: 4,
              paddingRight: 4,
              backgroundColor: '#FAF7F3',
            }}
          >
            or
          </Text>
          <View
            style={{
              width: '100%',
              height: 1,

              backgroundColor: '',
              position: 'absolute',
              top: '50%',
              zIndex: 0,
            }}
          ></View>
        </View>
        <SocialInput
          label={'Email'}
          handleValue={handleEmail}
          placeholder="Enter your email."
          error={emailerrormessage}
        />

        {emailerrormessage && (
          <Text style={{ color: '#d44118ff', fontSize: 12, marginTop: -5 }}>
            {emailerrormessage}
          </Text>
        )}
        <SocialInput
          label={'Password'}
          handleValue={handlePassword}
          placeholder="Enter your password."
          password={true}
          showicon={true}
        />
        <TouchableOpacity
          disabled={loading}
          onPress={onSignupPress}
          style={styles.loginbtn}
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={styles.btntitle}>Sign in</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linkcontainer}>
          <Text style={styles.linktext}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.maintext}>Sign up here..</Text>
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
