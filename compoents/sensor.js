import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import {
//   accelerometer,
//   gyroscope,
//   magnetometer,
//   barometer,
//   setUpdateIntervalForType,
//   SensorTypes,
// } from 'react-native-sensors';

export default function SensorDemo() {
  // State for each sensor
  const [accel, setAccel] = useState({});
  const [gyro, setGyro] = useState({});
  const [magnet, setMagnet] = useState({});
  const [baro, setBaro] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // // Set slower update interval to save battery
    // setUpdateIntervalForType(SensorTypes.accelerometer, 200); // ms
    // setUpdateIntervalForType(SensorTypes.gyroscope, 200);
    // setUpdateIntervalForType(SensorTypes.magnetometer, 200);
    // setUpdateIntervalForType(SensorTypes.barometer, 500);

    const _errors = [];

    // Accelerometer Subscription
      // const accelSub = accelerometer.subscribe(
      //   data => setAccel(data),
      //   error => _errors.push('Accelerometer: ' + error.message)
      // );

    // Gyroscope Subscription
    // const gyroSub = gyroscope.subscribe(
    //   data => setGyro(data),
    //   error => _errors.push('Gyroscope: ' + error.message)
    // );

    // // Magnetometer Subscription
    // const magnetSub = magnetometer.subscribe(
    //   data => setMagnet(data),
    //   error => _errors.push('Magnetometer: ' + error.message)
    // );

    // // Barometer Subscription
    // const baroSub = barometer.subscribe(
    //   data => setBaro(data),
    //   error => _errors.push('Barometer: ' + error.message)
    // );

    // On unmount: unsubscribe all
    return () => {
      accelSub.unsubscribe();
      gyroSub.unsubscribe();
      magnetSub.unsubscribe();
      baroSub.unsubscribe();
      setErrors(_errors);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Device Sensor Readings</Text>
      
      <View style={styles.block}>
        <Text style={styles.title}>Accelerometer</Text>
        {/* {accel && (typeof accel.x !== 'undefined') ? (
          <>
            <Text>X: {accel.x?.toFixed(3)}</Text>
            <Text>Y: {accel.y?.toFixed(3)}</Text>
            <Text>Z: {accel.z?.toFixed(3)}</Text>
            <Text>Timestamp: {accel.timestamp}</Text>
          </>
        ) : <Text style={styles.missing}>Not available</Text>} */}
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Gyroscope</Text>
        {/* {gyro && (typeof gyro.x !== 'undefined') ? (
          <>
            <Text>X: {gyro.x?.toFixed(3)}</Text>
            <Text>Y: {gyro.y?.toFixed(3)}</Text>
            <Text>Z: {gyro.z?.toFixed(3)}</Text>
            <Text>Timestamp: {gyro.timestamp}</Text>
          </>
        ) : <Text style={styles.missing}>Not available</Text>} */}
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Magnetometer</Text>
        {/* {magnet && (typeof magnet.x !== 'undefined') ? (
          <>
            <Text>X: {magnet.x?.toFixed(3)}</Text>
            <Text>Y: {magnet.y?.toFixed(3)}</Text>
            <Text>Z: {magnet.z?.toFixed(3)}</Text>
            <Text>Timestamp: {magnet.timestamp}</Text>
          </>
        ) : <Text style={styles.missing}>Not available</Text>} */}
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Barometer</Text>
        {/* {baro && (typeof baro.pressure !== 'undefined') ? (
          <>
            <Text>Pressure: {baro.pressure?.toFixed(2)} hPa</Text>
            <Text>Timestamp: {baro.timestamp}</Text>
          </>
        ) : <Text style={styles.missing}>Not available</Text>} */}
      </View>

      {errors.length ? (
        <View style={styles.block}>
          <Text style={styles.errorTitle}>Errors:</Text>
          {errors.map((err, idx) => <Text key={idx} style={styles.missing}>{err}</Text>)}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, alignItems: 'stretch' },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 12, fontWeight: 'bold' },
  block: { marginVertical: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  missing: { color: 'grey', fontStyle: 'italic' },
  errorTitle: { color: 'red', fontWeight: 'bold', marginBottom: 4 }
});
