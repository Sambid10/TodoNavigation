/* eslint-disable react-native/no-inline-styles */
import { ErrorToast, SuccessToast } from 'react-native-toast-message';
import { BaseToastProps } from 'react-native-toast-message';
export const toastConfig = {
  customsuccess: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      style={{ backgroundColor: '#f6fef8', borderLeftColor: '#22c55e' }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
 customerror: (props: BaseToastProps) => (
  <ErrorToast
    {...props}
    style={{ backgroundColor: '#fef2f2', borderLeftColor: '#ef4444' }}
    text1Style={{
      fontSize: 15,
    }}
    text2Style={{
      fontSize: 12,
    }}
  />
),
};
