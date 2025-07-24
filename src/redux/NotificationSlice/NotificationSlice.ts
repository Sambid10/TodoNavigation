import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState = {
  message: "",
  messagetitle: ""
};

export type MessageType = 'success' | "error" | "customsuccess" | "customerror";

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notification: (
      state,
      action: PayloadAction<{ message: string; type: MessageType,messagetitle:string}>
    ) => {
      const { message, type ,messagetitle} = action.payload;
      state.message = message; // ?
      state.messagetitle=messagetitle // ?
      Toast.show({
        type:type,
        text2:message,
        text1:messagetitle,
      });
    },
  },
});

export const { notification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
