import React from 'react';
import { Button, View } from 'react-native';
import RNRestart from 'react-native-restart';


/* 
    setup of this library
    1. Install the library:
        npm install react-native-restart --save
    2. Link the library (if not using auto-linking):
        react-native link react-native-restart
*/

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