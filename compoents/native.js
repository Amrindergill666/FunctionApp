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
import CameraFile from './Camera';


const Native = () => {

    const { colors } = useTheme();
    console.log('colors: ', colors, ' (line: 18)');

 
   
    return (
        <View style={{ flex: 1,  backgroundColor: colors.background }}>
            {/* <Text>Native Component</Text> */}
            
            {/* <BiometricsAuth/> */}
            {/* <BLEComponent /> */}
            {/* <SensorDemo/> */}
            {/* <HapticExample/> */}
            {/* <VibrateExample/> */}
            {/* <GoogleSignInButton/> */}
            {/* <PhoneAuthScreen/> */}
            {/* <MultiLanguageDemo/> */}
            {/* <RefreshButton /> */}
            {/* <CameraFile/> */}
            
        </View>
    );
}

export default Native;