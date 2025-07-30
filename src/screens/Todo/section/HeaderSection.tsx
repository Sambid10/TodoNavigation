/* eslint-disable react-native/no-inline-styles */
import { getAuth } from '@react-native-firebase/auth';
import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { useAppDispatch } from '../../../hooks/hook';
// import { notification } from '../../../redux/NotificationSlice/NotificationSlice';
// import SearchInput from '../components/SearchInput';
export default function HeaderSection() {
  // const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const imageuri = user?.photoURL;
  return (
    <View style={styles.headercontainer}>
      <View style={styles.headercontainerwrapper}>
        <TouchableOpacity>
          <Image
            style={styles.iconimg}
            source={require('../../../assets/hamburger.png')}
          />
        </TouchableOpacity>
        {/* <SearchInput /> */}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:"center",
            gap: 12,
            flexDirection: 'row',
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headercontainerwrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F3EF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'gray',
  },
  headercontainer: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconimg: {
    objectFit: 'cover',
    height: 24,
    width: 24,
  },
  img: {
    height: 42,
    width: 42,
    borderRadius: 99,
    backgroundColor: 'brown',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
