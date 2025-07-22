/* eslint-disable react-native/no-inline-styles */
import { BaseToast, ErrorToast, SuccessToast } from 'react-native-toast-message'
export const toastConfig = {
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props:any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  customsuccess:(props:any)=>(
    <SuccessToast
    {...props}
    style={{backgroundColor:"#f0fdf4",borderLeftColor: '#22c55e'}}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  )
};
