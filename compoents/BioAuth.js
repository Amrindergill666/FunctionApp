import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export default function BiometricsAuth({ onSuccess }) {
  const navigation = useNavigation();
  const [biometryType, setBiometryType] = useState(null);
  const [available, setAvailable] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Check biometric sensor availability on mount
  useEffect(() => {
    rnBiometrics.isSensorAvailable()
      .then(({ available, biometryType }) => {
        setAvailable(available);
        setBiometryType(biometryType);
      })
      .catch(() => {
        setAvailable(false);
        setErrorMessage('Biometric sensor not available on this device.');
      });
  }, []);

  // Prompt biometric authentication
  const handleAuthenticate = () => {
    setErrorMessage('');
    rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' })
      .then(result => {
        if (result.success) {
          setAuthenticated(true);
          setErrorMessage('');
          if (onSuccess) onSuccess();
        } else {
          setAuthenticated(false);
          setErrorMessage('Authentication cancelled.');
        }
      })
      .catch((err) => {
        setAuthenticated(false);
        setErrorMessage(err.message || 'Biometric authentication failed.');
      });
  };

  if (authenticated) {
    return (
      <View style={styles.center}>
        <Text style={styles.success}>Authenticated!</Text>
        <Button
          title="Move next"
          onPress={() => navigation.navigate('RefreshButton')}
        />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>
        {available === null && 'Checking biometric availability…'}
        {available === false && 'Biometric authentication not available.'}
        {available && biometryType && `Authenticate using ${biometryType}.`}
      </Text>

      {available && (
        <Button title="Authenticate" onPress={handleAuthenticate} />
      )}
      
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 18, marginBottom: 16, textAlign: 'center',color :'#fff' },
  error: { color: 'red', marginTop: 16, textAlign: 'center' },
  success: { color: 'green', fontSize: 20, textAlign: 'center' },
});
