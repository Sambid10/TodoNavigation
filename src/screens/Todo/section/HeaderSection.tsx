import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import SearchInput from '../components/SearchInput';
export default function HeaderSection() {
  return (
    <View style={styles.headercontainer}>
      <View style={styles.headercontainerwrapper}>
        <TouchableOpacity>
          <Image
            style={styles.iconimg}
            source={require('../../../assets/hamburger.png')}
          />
        </TouchableOpacity>
        <SearchInput />

        <Image style={styles.img} source={require('../../../assets/user1.jpg')} />
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