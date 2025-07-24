/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfilePage() {
  const auth=getAuth()
  const user=auth.currentUser
  return (
    <View style={styles.maincontainer}>
      <Text style={{fontSize:16}}>
        Email:
        {user?.email}
      </Text>
    </View>
  );
}
const styles=StyleSheet.create({
    maincontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FAF7F3',
    padding: 12,
  },
})