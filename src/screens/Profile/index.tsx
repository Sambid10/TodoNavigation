/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../../hooks/hook';
import { TouchableOpacity } from 'react-native';
import { notification } from '../../redux/NotificationSlice/NotificationSlice';
import { signOut } from '@react-native-firebase/auth';
('');
export default function ProfilePage() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const user = auth.currentUser;
  return (
    <View style={styles.maincontainer}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
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
        <View style={{display:"flex",gap:12}}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Email: </Text>
            <Text style={{ fontSize: 16, marginTop: 10 }}>{user?.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              signOut(getAuth()).then(() => {
                dispatch(
                  notification({
                    message: 'Signed out..',
                    messagetitle: 'Success!!',
                    type: 'customsuccess',
                  }),
                );
              })
            }
            style={{
              backgroundColor: '#27548A',
              borderRadius: 99,
              padding: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <Text style={{ color: 'white', fontSize: 16 }}>Sign out</Text>
            </View>
          </TouchableOpacity>
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
    borderRadius: 99,
    backgroundColor: 'brown',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
