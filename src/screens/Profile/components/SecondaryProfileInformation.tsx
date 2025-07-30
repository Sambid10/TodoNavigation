/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SecondaryProfileInformation({
  label,
  information,
}: {
  label?: string;
  information: string | undefined | null;
}) {
  const displayInfo = information?.trim() ? information : 'Not provided';

  return (
    <View style={style.container}>
      <Text style={{ color: '#27548A', fontSize: 18, fontWeight: '500' }}>
        {label} :
      </Text>
      <Text style={[!information ? style.noinformation : style.information]}>
  {displayInfo}
</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  information: {
    color: '#121212',
    fontSize: 18,
  },
  noinformation: {
    color: '#121212',
    fontSize: 14,
  },
});
