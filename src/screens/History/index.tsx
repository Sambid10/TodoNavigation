import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function History() {
  return (
    <View style={styles.maincontainer}>
      <Text>History</Text>
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