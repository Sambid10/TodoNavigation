/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
export default function TextInputComponent({
  formlabel,
  inputplaceholder,
  multiline,
  handleValue,
}: {
  formlabel: string;
  inputplaceholder: string;
  multiline?: boolean;
  handleValue: (val: string) => void;
}) {



  return (
    <View style={styles.formcontainer}>
      <Text>{formlabel}</Text>
      <TextInput

        onChangeText={text => handleValue(text)}
        style={[
          styles.input,
          {
            minHeight: multiline ? 100 : 50,
            textAlignVertical: multiline ? 'top' : 'center',
          },
        ]}
        multiline={multiline}
        placeholder={inputplaceholder}
        placeholderTextColor={'#9CA3AF'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#121212',
    paddingLeft: 12,
    height: 50,
    color: 'black',
    backgroundColor: 'white',
  },
  formcontainer: {
    display: 'flex',
    gap: 6,
  },
});
