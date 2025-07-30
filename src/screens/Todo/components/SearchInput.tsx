import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function SearchInput() {
  return (
    <View style={styles.textinputcontainer}>
      <TextInput
        placeholderTextColor="#393E46"
        placeholder="Search"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.iconcontainer}>
        <Image
          style={styles.searchicon}
          source={require('../../../assets/search.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textinputcontainer: {
    zIndex: 0,
    width:"50%",
  },
  textInput: {
    borderWidth: 1,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 12,
    height: 45,
    paddingLeft: 35,
    color:"black",
    borderColor: '#242424',
    shadowColor: '#393E46',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  iconcontainer: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    top: '25%',
  },
  searchicon: {
    height: 14,
    width: 14,
  },
});