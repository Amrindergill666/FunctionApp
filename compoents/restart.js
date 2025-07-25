import React from 'react';
import { Button, View } from 'react-native';
import RNRestart from 'react-native-restart';

const RefreshButton = () => {
    return (
       <View style={{ padding: 20 }}>
            <Button
                title="Refresh App"
                onPress={() => {
                    RNRestart.Restart();
                }}
            />
        </View>
    );
}
export default RefreshButton;