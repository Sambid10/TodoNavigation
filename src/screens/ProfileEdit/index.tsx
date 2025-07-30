/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { useAppDispatch } from '../../hooks/hook';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import ProfileTextInput from './components/ProfileTextInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type ProfileEditProp = RouteProp<RootStackParamList, 'ProfileEdit'>;
type ProfilePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileEdit'
>;
export default function ProfileEdit() {
  const [username, setusername] = useState('');
  const [loading, setLoading] = useState(false);
  const [country, setcountry] = useState('');
  const [contactno,setcontactno]=useState('')
  const route = useRoute<ProfileEditProp>();
  const [state, setstate] = useState('');
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const userid = auth.currentUser!.uid;
  const navigation = useNavigation<ProfilePageProp>();
  useEffect(() => {
    if (route.params.userinfo) {
      setcountry(route.params.userinfo.country);
      setusername(route.params.userinfo.username);
      setstate(route.params.userinfo.state);
      setcontactno(route.params.userinfo.contactno)
    }
  }, [route.params.userinfo]);

  const onSave = async () => {
    setLoading(true);
    if (!username.trim() && !country.trim() && !state.trim()) {
      setLoading(false);
      return null;
    }
    try {
      const users = firestore().collection('users');
      const snapshot = await users.where('userid', '==', userid).get();
      const userData = {
        userid,
        email: auth.currentUser?.email,
        username,
        country,
        state,
        avatarurl: auth.currentUser?.photoURL,
        contactno
      };
      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await users
          .doc(docId)
          .update(userData)
          .then(() => navigation.navigate('Home',{screen:"TabProfile"}));
      } else {
        await users.add(userData).then(() => navigation.navigate('Home',{screen:"TabProfile"}));
      }
      dispatch(
        notification({
          message: 'User profile updated.',
          type: 'customsuccess',
          messagetitle: 'Success!!',
        }),
      );
    } catch (error) {
      console.error('profile ma editing problem', error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <Text style={styles.maintitle}>Edit Profile?</Text>
      <View style={{ display: 'flex', gap: 12 }}>
        <ProfileTextInput
          label="Username"
          placeholder="Enter your username"
          handleValue={setusername}
          value={username}
        />
        <ProfileTextInput
          label="Country"
          placeholder="Enter your country"
          handleValue={setcountry}
          value={country}
        />
        <ProfileTextInput
          label="State"
          placeholder="Enter your state"
          handleValue={setstate}
          value={state}
        />
         <ProfileTextInput
          label="Contact no"
          placeholder="Enter your contact number"
          handleValue={setcontactno}
          value={contactno}
        />
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={onSave}
            disabled={loading}
            style={{
              paddingTop: 10,
              paddingBottom: 12,
              backgroundColor: '#27548A',
              borderRadius: 10,
              paddingLeft: 20,
              paddingRight: 20,
              width: 100,
            }}
          >
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{ textAlign: 'center', color: 'white' }}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FAF7F3',
  },
  maintitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 12,
    color: 'black',
    marginTop: 70,
    textAlign: 'center',
  },
});
