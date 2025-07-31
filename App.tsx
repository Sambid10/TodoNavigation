/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import RootStack from './src/navigation/Navigation';
import { NavigationContainer} from '@react-navigation/native';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/toastconfig/toastconfig';
import { useState } from 'react';
// import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance ,EventType} from '@notifee/react-native';
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import AuthNaviagtion from './src/navigation/AuthNaviagtion';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PermissionsAndroid } from 'react-native';
import { navigationRef } from './src/navigation/NavigationRef';
import { navigate } from './src/navigation/NavigationRef';
import firestore from '@react-native-firebase/firestore';
function App() {
  useEffect(() => {
    async function createNotificationChannel() {
      await notifee.requestPermission();
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
    createNotificationChannel();

    const subscribeMessage = messaging().onMessage(async remoteMessage => {
      console.log('asssssssssssssssssssssssssss', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title ?? 'No title',
        body: remoteMessage.notification?.body ?? 'No body',
        android: {
          channelId: 'default',
        },
      });
    });
    return () => {
      subscribeMessage();
    };
  }, []);
  // useEffect(() => {
  //   async function getFcmToken() {
  //     const token = await messaging().getToken();
  //     if (token) {
  //       console.log('FCM Token:', token);
  //     } else {
  //       console.log('Failed to get FCM token');
  //     }
  //   }
  //   getFcmToken();
  // }, []);

useEffect(() => {
  const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      const data = detail.notification?.data;
      if (!data) return;
      const todoId = Number(data.todoId);
      let todo;
      try {
        todo = data.todo ? JSON.parse(data.todo as any) : null;
        if (todo?.datetime) {
          todo.datetime = firestore.Timestamp.fromDate(new Date(todo.datetime));
        }
      } catch (e) {
        console.warn('Failed to parse todo from notification data', e);
        todo = null;
      }
      if (!isNaN(todoId) && todo) {
        navigate('TodoDetails', { todoid: todoId, todo });
      }
    }
  });

  return () => unsubscribe();
}, []);


  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '985523250449-jiq41h2bubrp9rlmgn3njpsagtih4sdt.apps.googleusercontent.com',
    });
  }, []);
  const [intializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function handleAuthStateChange(user: FirebaseAuthTypes.User | null) {
    console.log('ola!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    setUser(user);
    if (intializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChange);
    return subscriber;
  }, []);

  if (intializing) return null;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <View style={styles.container}>
            {!user ? (
              <AuthNaviagtion />
            ) : (
              <>
                <RootStack />
              </>
            )}
            <Toast config={toastConfig} />
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    position: 'relative',
  },
});

export default App;
