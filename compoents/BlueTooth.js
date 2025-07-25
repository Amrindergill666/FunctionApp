import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Button,
    NativeEventEmitter,
    NativeModules,
    PermissionsAndroid,
    Platform,
    FlatList,
    Alert
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = {};
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

async function requestBluetoothPermissions() {
    if (Platform.OS === 'android') {
        const perms = [];
        if (Platform.Version >= 31) {
            perms.push(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
            );
        } else if (Platform.Version >= 23) {
            perms.push(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        }
        if (perms.length === 0) return true;
        const granted = await PermissionsAndroid.requestMultiple(perms);
        return Object.values(granted).every(r => r === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true;
}

export default function BLEComponent() {
    const [devices, setDevices] = useState([]);
    console.log('devices: ', devices, ' (line: 38)');
    const [isScanning, setIsScanning] = useState(false);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
    const deviceMap = useRef({});

    useEffect(() => {
        requestBluetoothPermissions().then(granted => {
            if (granted) {
                BleManager.start({ showAlert: false })
                    .then(() => {
                        BleManager.checkState(); // fires BleManagerDidUpdateState event
                        console.log("BLE Manager initialized");
                    })
                    .catch(console.warn);
            } else {
                console.warn("Bluetooth permissions denied!");
            }
        });

        const handleDiscover = bleManagerEmitter.addListener(
            'BleManagerDiscoverPeripheral',
            (peripheral) => {
                console.log('peripheral: ', peripheral, ' (line: 60)');
                if (!deviceMap.current[peripheral.id]) {
                    deviceMap.current[peripheral.id] = true;
                    setDevices(prev => [...prev, peripheral]);
                }
            }
        );

        const handleStop = bleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                setIsScanning(false);
                console.log('Scan stopped');
            }
        );

        // Listen for Bluetooth state changes
        const handleUpdateState = bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            ({ state }) => {
                setBluetoothEnabled(state === 'on');
                console.log('Bluetooth state:', state);
            }
        );


        const stateListener = bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            ({ state }) => {
                console.log('Bluetooth State:', state);
            }
        );
        BleManager.checkState();

        return () => {
            stateListener.remove();
            handleDiscover.remove();
            handleStop.remove();
            handleUpdateState.remove();
        };
    }, []);

    // Attempt to enable Bluetooth on Android if needed
    const enableBluetooth = () => {
        BleManager.enableBluetooth()
            .then(() => setBluetoothEnabled(true))
            .catch(() => Alert.alert('Bluetooth required', 'Please enable Bluetooth to scan devices.'));
    };

    const startScan = () => {
        if (!bluetoothEnabled) {
            if (Platform.OS === 'android') {
                enableBluetooth();
            } else {
                Alert.alert('Bluetooth is off', 'Please turn on Bluetooth in Settings.');
            }
            return;
        }
        if (!isScanning) {
            setDevices([]);
            deviceMap.current = {};
            BleManager.scan([], 20, true)
                .then(() => {
                    setIsScanning(true);
                    console.log('Scan started');
                })
                .catch(error => {
                    console.error('Scan error: ', error);
                });
        }
    };

    const renderItem = ({ item }) => (
        <Text style={{ marginVertical: 2 }}>
            {item.name || '(no name)'} {`\nID: ${item.id}`}
        </Text>
    );

    return (
        <View style={{ padding: 16 }}>
            <Button
                title={isScanning ? "Scanning..." : "Scan for Devices"}
                onPress={startScan}
                disabled={isScanning}
            />
            {!bluetoothEnabled && (
                <Text style={{ color: 'red', marginTop: 10 }}>
                    Bluetooth is OFF. Please enable Bluetooth to scan.
                </Text>
            )}
            <View style={{ marginTop: 16, minHeight: 100 }}>
                {devices.length > 0 ? (
                    <FlatList
                        data={devices}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text style={{ color: 'gray', marginTop: 8 }}>
                        {isScanning ? 'Scanning for devices...' : 'No devices found'}
                    </Text>
                )}
            </View>
        </View>
    );
}
