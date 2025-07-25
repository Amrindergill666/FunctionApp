import React from 'react';
import { Button, View, ScrollView, Text } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

// List of all supported haptic feedback types
const hapticTypes = [
  { type: 'impactLight', label: 'Impact Light' },
  { type: 'impactMedium', label: 'Impact Medium' },
  { type: 'impactHeavy', label: 'Impact Heavy' },
  { type: 'notificationSuccess', label: 'Notification Success' },
  { type: 'notificationWarning', label: 'Notification Warning' },
  { type: 'notificationError', label: 'Notification Error' },
  { type: 'clockTick', label: 'Selection' }
];

export default function HapticDemo() {
  return (
    <ScrollView contentContainerStyle={{ margin: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Haptic Feedback Demo</Text>
      {hapticTypes.map(({ type, label }) => (
        <View style={{ marginVertical: 8 }} key={type}>
          <Button
            title={label}
            onPress={() => ReactNativeHapticFeedback.trigger(type, options)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
