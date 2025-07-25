import React from 'react';
import { Button, Vibration, View } from 'react-native';


export default function VibrateExample() {

  
  return (
    <View style={{marginTop: 50,gap:20}}>
      <Button
        title="Vibrate - 400ms"
        onPress={() => Vibration.vibrate(400)}
      />
      <Button
        title="Vibrate - Pattern"
        onPress={() => Vibration.vibrate([500, 1000, 500, 500])} // Android only: vibrate, pause, vibrate, pause (ms)
      />
      <Button
        title="Stop Vibration"
        onPress={() => Vibration.cancel()}
      />
    </View>
  );
}
