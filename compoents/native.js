import React, { useEffect, useState } from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native'
// import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import BiometricsAuth from './BioAuth';
import BLEComponent from './BlueTooth';
import SensorDemo from './sensor';
import HapticExample from './haptic';
import VibrateExample from './vibration';
import GoogleSignInButton from './googleAuth';
import PhoneAuthScreen from './phoneNumber';
import MultiLanguageDemo from './translation';
import { useTheme } from '@react-navigation/native';
import RefreshButton from './restart';


const Native = () => {

    const { colors } = useTheme();
    console.log('colors: ', colors, ' (line: 18)');

 
    // const [granted, setGranted] = useState(false);
    // console.log('granted: ', granted, ' (line: 9)');
    // // const [device, setDevice] = useState('');
    // const [cameraPermission, setCameraPermission] = useState(false);
    // const device = useCameraDevice('back')
    // console.log('device: ', device, ' (line: 13)');

    // // Request camera permission on mount
    // useEffect(() => {
    //     const requestCameraPermission = async () => {
    //         const permission = await Camera.requestCameraPermission();
    //         if (permission === 'denied') {
    //             setGranted(false);
    //             console.warn('Camera permission denied');
    //         } else if (permission === 'granted') {
    //             setGranted(true);
    //             console.log('Camera permission granted');
    //         }
    //     };
    //     requestCameraPermission();
    // }, []);

    // Set the device once cameras are available and permission has been granted

    // const device = devices.back;
    return (
        <View style={{ flex: 1,  backgroundColor: colors.background }}>
            {/* <Text>Native Component</Text> */}
            {/* {granted ?
                <Camera style={StyleSheet.absoluteFill} device={device}  enableZoomGesture isActive={true} />
                :
                <Button title="Open Settings" onPress={() => Linking.openSettings()} />
            } */}
            <BiometricsAuth/>
            {/* <BLEComponent /> */}
            {/* <SensorDemo/> */}
            {/* <HapticExample/> */}
            {/* <VibrateExample/> */}
            {/* <GoogleSignInButton/> */}
            {/* <PhoneAuthScreen/> */}
            {/* <MultiLanguageDemo/> */}
            {/* <RefreshButton /> */}
            
        </View>
    );
}

export default Native;