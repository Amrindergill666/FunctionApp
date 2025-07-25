import React,{useState,useEffect} from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native'
import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera'


/*
    setup this library
    1. Install the library:
        npm install react-native-vision-camera
    2. Link the library (if not using auto-linking):
        react-native link react-native-vision-camera
    3. Add the following to your android/app/src/main/AndroidManifest.xml file:
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-feature android:name="android.hardware.camera" />
        <uses-feature android:name="android.hardware.camera.autofocus" />
    4. Add the following to your iOS/Info.plist:
        <key>NSCameraUsageDescription</key>
        <string>Your custom message for camera permission</string>

*/

const CameraFile=()=>{

     const [granted, setGranted] = useState(false);
    // const [device, setDevice] = useState('');
    const [cameraPermission, setCameraPermission] = useState(false);
    const device = useCameraDevice('back')

    // Request camera permission on mount
    useEffect(() => {
        const requestCameraPermission = async () => {
            const permission = await Camera.requestCameraPermission();
            if (permission === 'denied') {
                setGranted(false);
                console.warn('Camera permission denied');
            } else if (permission === 'granted') {
                setGranted(true);
                console.log('Camera permission granted');
            }
        };
        requestCameraPermission();
    }, []);

    // Set the device once cameras are available and permission has been granted

    // const device = devices.back;
return(
    <View style={{flex:1}}>
        {granted ?
                        <Camera style={StyleSheet.absoluteFill} device={device}  enableZoomGesture isActive={true} />
                        :
                        <Button title="Open Settings" onPress={() => Linking.openSettings()} />
                    }
    </View>
)

}

export default CameraFile;