/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../../hooks/hook';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import { signOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import firestore from '@react-native-firebase/firestore';
type ProfileEditScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileEdit'
>;
import SecondaryProfileInformation from './components/SecondaryProfileInformation';
import { useState } from 'react';
import ProfileInformation from './components/ProfileInformation';
export type FirebaseUser = {
  avatarurl: string;
  country: string;
  email: string;
  state: string;
  userid: string;
  username: string;
  contactno: string
};

import { useNavigation } from '@react-navigation/native';
export default function ProfilePage() {
  const navigation = useNavigation<ProfileEditScreenProp>();
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const user = auth.currentUser;
  const imageuri = user?.photoURL;
  const [firebaseuser, setfirebaseuser] = useState<FirebaseUser | null>();
  useEffect(() => {
    const loaduserprofile = async () => {
      try {
        const snapshot = await firestore()
          .collection('users')
          .where('userid', '==', user?.uid)
          .get();
        if (!snapshot.empty) {
          const dbuser = snapshot.docs[0].data() as FirebaseUser;
          setfirebaseuser(dbuser);
        } else {
          setfirebaseuser(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loaduserprofile();
  }, [user?.uid]);

  return (
    <View style={styles.maincontainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:24
        }}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {imageuri ? (
            <Image source={{ uri: imageuri }} style={styles.img} />
          ) : (
            <View style={styles.img}>
              <Text
                style={{
                  color: 'white',
                  textTransform: 'uppercase',
                  fontSize: 40,
                }}
              >
                {user?.email?.slice(0, 1)}
              </Text>
            </View>
          )}
          <View>
            <ProfileInformation 
            color='#27548A'
            fontSize={24}
            information={firebaseuser?.username} />
            <ProfileInformation information={user?.email} />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', gap: 12,marginTop:6 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileEdit',{userinfo:firebaseuser!})}
              style={{
                backgroundColor: 'white',
                borderColor: '#27548A',
                borderWidth: 1,
                borderRadius: 99,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}
            >
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await signOut(getAuth()).then(() => {
                  dispatch(
                    notification({
                      message: 'Signed out..',
                      messagetitle: 'Success!!',
                      type: 'customsuccess',
                    }),
                  );
                });
                await GoogleSignin.revokeAccess();
              }}
              style={{
                backgroundColor: '#27548A',
                borderRadius: 99,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}
            >
              <View>
                <Text style={{ color: 'white', fontSize: 16 }}>Sign out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View
          style={{
            display: 'flex',
            gap: 12,
            width: '100%',
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          <Text style={{textAlign:"center",textDecorationLine:"underline"}}>Additional Information.</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap:4
            }}
          >
            <SecondaryProfileInformation
              label="Country"
              information={firebaseuser?.country}
            />
            <SecondaryProfileInformation
              label="State"
              information={firebaseuser?.state}
            />
            <SecondaryProfileInformation
              label="Contact no"
              information={firebaseuser?.contactno}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FAF7F3',
    padding: 12,
    paddingTop: 25,
    display: 'flex',
    gap: 20,
  },
  img: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor: 'brown',
    borderColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintitle: {
    fontSize: 24,
    fontWeight: '500',
  },
});
