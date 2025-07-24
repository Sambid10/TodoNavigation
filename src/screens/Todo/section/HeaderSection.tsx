/* eslint-disable react-native/no-inline-styles */
import { getAuth, signOut } from '@react-native-firebase/auth';
import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useAppDispatch } from '../../../hooks/hook';
import { notification } from '../../../redux/NotificationSlice/NotificationSlice';
// import SearchInput from '../components/SearchInput';
export default function HeaderSection() {
  const dispatch = useAppDispatch();
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
            gap: 12,
            flexDirection: 'row',
          }}
        >
          <Image
            style={styles.img}
            source={require('../../../assets/user1.jpg')}
          />
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
              borderRadius: 12,
              padding: 10,
            }}
          >
            <View>
              <Text style={{ color: 'white' }}>Sign out</Text>
            </View>
          </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: '#F0E4D3',
  },
});
