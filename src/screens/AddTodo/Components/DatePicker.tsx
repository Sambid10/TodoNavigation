/* eslint-disable react-native/no-inline-styles */
import DatePicker from 'react-native-date-picker';
import { Text, View } from 'react-native';

export default function DatePickerComponent({
  label,
  setDate,
  date,
  disabled,
}: {
  setDate: (date: Date) => void;
  date: Date;
  label: string;
  disabled: boolean;
}) {
  return (
    <View
      style={{
        marginTop: 50,
        display: 'flex',
      }}
    >
      <Text>{label}</Text>
      <View
        style={[
          disabled === true && { pointerEvents: "none" },
          {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          },
        ]}
      >
        <DatePicker
          dividerColor="#000"
          buttonColor="#000"
          theme="light"
          date={date}
          onDateChange={setDate}
        />
      </View>
    </View>
  );
}
