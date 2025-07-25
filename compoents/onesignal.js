import React, {useEffect} from 'react';
import { View } from 'react-native';
// Include the OneSignal package
import {OneSignal, LogLevel} from 'react-native-onesignal';

function App() {
  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize('ae0314fb-60a7-4569-86ab-625d84f61a80');
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