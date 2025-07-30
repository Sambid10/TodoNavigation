
import {
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { View } from 'react-native';
export default function ProfileTextInput({
  placeholder,
  handleValue,
  label,
  value
}: {
  placeholder: string;
  label: string;
  value:string,
  handleValue: (val: string) => void;
}) {
  return (
    <View>
      <Text>{label}:</Text>
      <View style={styles.textinputcontainer}>
        <TextInput
          autoCapitalize="none"
          placeholderTextColor={'gray'}
          style={[styles.input]}
          placeholder={placeholder}
          onChangeText={text => handleValue(text)}
          value={value}
        />
        
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
