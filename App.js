/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect } from 'react';
import { Alert, Platform, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import OneMsg from './compoents/onesignal';
import LottieView from 'lottie-react-native';
import Native from './compoents/native';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RefreshButton from './compoents/restart';

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
const Stack = createNativeStackNavigator();

function App() {
  const isAndroid13OrHigher = Platform.OS === 'android' && Platform.Version >= 33;
  const topPadding = isAndroid13OrHigher ? StatusBar.currentHeight : 0;
  // useEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, [])
  const isDarkMode = useColorScheme();
  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2196f3',
      background: '#fff',
      card: '#fafafa',
      text: '#222',
      // Add or override more colors
    }
  };
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#bb86fc',
      background: '#121212',
      card: '#222',
      text: '#fff',
    }
  };
  return (
    <View style={[styles.container,{paddingTop:topPadding}]}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer theme={isDarkMode == 'dark' ? MyDarkTheme : MyLightTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Native" component={Native} />
          <Stack.Screen name="RefreshButton" component={RefreshButton} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* <NewAppScreen templateFileName="App.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
