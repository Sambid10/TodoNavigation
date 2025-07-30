/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileInformation({
  label,
  information,
  fontSize,
  color,
}: {
  label?: string;
  information: string | undefined | null;
  fontSize?: number;
  color?: string;
}) {
  const hasInfo = information?.trim();
  const displayInfo = hasInfo ? information : 'No username';

  return (
    <View>
      {label && (
        <Text style={{ fontSize: 16, flexWrap: 'wrap', color: '#121212' }}>
          {label}
        </Text>
      )}

      <Text
        style={[
          !hasInfo
            ? style.noinformation
            : {
                fontSize: fontSize ?? 16,
                textAlign: 'center',
                color: color ?? '#121212',
              },
        ]}
      >
        {displayInfo}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  noinformation: {
    fontSize: 20,
    textAlign: 'center',
  },
});
