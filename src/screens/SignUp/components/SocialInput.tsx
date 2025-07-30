/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
export default function SocialInput({
  placeholder,
  password = false,
  showicon = false,
  error,
  handleValue,
  label,
}: {
  placeholder: string;
  password?: boolean;
  showicon?: boolean;
  error?:string
  label: string;
  handleValue: (val: string) => void;
}) {
  const [seePassword, setPassword] = useState(false);
  return (
    <View>
      <Text style={[ {paddingBottom: 4},error ? error?.length > 0 && {color:"#d44118ff"} : null] }>{label}:</Text>
      <View style={styles.textinputcontainer}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={password && !seePassword}
          placeholderTextColor={'gray'}
          style={[styles.input,error ? error?.length > 0 && {borderColor:"#d44118ff"} : null]}
          placeholder={placeholder}
          onChangeText={text => handleValue(text)}
        />
        {showicon && (
          <View style={styles.eyeiconwrapper}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setPassword(prev => !prev)}
            >
              {seePassword ? (
                <Image
                  style={styles.eyeicon}
                  source={require('../../../assets/eyeclose.png')}
                />
              ) : (
                <Image
                  style={styles.eyeicon}
                  source={require('../../../assets/eye.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textinputcontainer: {
    position: 'relative',
    zIndex: 0,
  },
  input: {
    borderStyle: 'solid',
    borderRadius: 10,
    height: 'auto',
    borderColor: '#2F3437',
    borderWidth: 1,
    width: 'auto',
    padding: 14,
    paddingRight: 32,
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 12,
    shadowColor: '#393E46',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  eyeicon: {
    height: 20,
    width: 20,
  },
  eyeiconwrapper: {
    position: 'absolute',
    right: 0,
    top:0,
    bottom:0,
    height: '100%',
    width: 50,
  },
});
