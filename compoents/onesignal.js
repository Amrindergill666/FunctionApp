import React, {useEffect} from 'react';
import { View } from 'react-native';
// Include the OneSignal package
import {OneSignal, LogLevel} from 'react-native-onesignal';


/*
  * OneSignal is a powerful push notification service.
  * This code initializes OneSignal in a React Native application.
  * Make sure to replace 'ae0314fb-60a7-xx-xx-xxxx-xxxx' with your actual OneSignal App ID.
  1. Install the OneSignal package:
    npm install --save react-native-onesignal
  2. Follow the OneSignal documentation to set up your app:
    https://documentation.onesignal.com/docs/react-native-sdk-setup
  3. Ensure you have the necessary permissions and configurations in your Android and iOS projects.

*/


function App() {
  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize('ae0314fb-60a7-xx-xx-xxxx-xxxx');
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
    OneSignal.Notifications.requestPermission(false);
  }, []); // Ensure this only runs once on app mount

  return (
    <View>

    </View>
  );
}

export default App;