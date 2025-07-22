/* eslint-disable react-native/no-inline-styles */
import { SuccessToast } from 'react-native-toast-message';
export const toastConfig = {
  customsuccess: (props:any) => (
    <SuccessToast
      {...props}
      style={{ backgroundColor: '#f0fdf4', borderLeftColor: '#22c55e' }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};
