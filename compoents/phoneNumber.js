import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import SmsRetriever from 'react-native-sms-retriever';   // ← NEW

export default function PhoneAuthScreen() {
    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState(null);      // Firebase confirmation object
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    /* ---------- 1.  Automatically listen for the OTP once we’re on the code screen ---------- */
    useEffect(() => {
        let smsListener = null;

        console.log(' (line: 26)');
        async function startListener() {
            try {
                const resister = await SmsRetriever.startSmsRetriever();            // fires promise when ready
                console.log('resister: ', resister, ' (line: 29)');
                smsListener = SmsRetriever.addSmsListener(event => {
                    console.log('event: ', event, ' (line: 30)');
                    const incoming = event.message;
                    const otp = incoming.match(/\d{4,6}/)?.[0];      // extract 4-6 digit code
                    if (otp) {
                        setCode(otp);
                        Alert.alert('OTP detected', `Code ${otp} inserted automatically.`);
                        smsListener.remove();
                    }
                });
            } catch (e) {
                // Most failures here are benign (Play Services too old, etc.)
                console.log('SMS-retriever error:', e);
            }
        }

        if (confirm && Platform.OS === 'android') startListener();

        return () => {
            if (smsListener) smsListener.remove();
        };
    }, [confirm]);

    /* ---------- 2.  Send OTP ---------- */
    async function signInWithPhoneNumber() {
        if (phone.length !== 10) {
            setError('Enter a valid 10-digit number');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
            setConfirm(confirmation);
            Alert.alert('OTP sent', 'Check your phone for the verification code.');
        } catch (err) {
            Alert.alert('Error', err.message || 'Failed to send OTP');
        }
        setLoading(false);
    }

    /* ---------- 3.  Verify OTP ---------- */
    async function confirmCode() {
        if (code.length < 4) return;

        setLoading(true);
        try {
            const result = await confirm.confirm(code);
            setUser(result.user);
            Alert.alert('Success', 'You are signed in!');
        } catch {
            Alert.alert('Error', 'Invalid code or session expired.');
        }
        setLoading(false);
    }

    /* ---------- 4.  Logout ---------- */
    async function handleLogout() {
        setLoading(true);
        try {
            await auth().signOut();
            setUser(null);
            setConfirm(null);
            setPhone('');
            setCode('');
        } finally {
            setLoading(false);
        }
    }

    /* ---------- 5.  UI ---------- */
    return (
        <View style={{ flex: 1, padding: 32, justifyContent: 'center' }}>
            {loading && <ActivityIndicator color="#222" />}

            {user ? (
                <View>
                    <Text style={{ fontSize: 18, marginBottom: 12 }}>
                        Welcome! {user.phoneNumber}
                    </Text>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            ) : confirm ? (
                <>
                    <Text>Enter the OTP sent to your phone:</Text>
                    <TextInput
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                        placeholder="123456"
                        maxLength={6}
                        style={{
                            borderWidth: 1,
                            marginVertical: 12,
                            padding: 8,
                            borderRadius: 6,
                        }}
                    />
                    <Button title="Verify Code" onPress={confirmCode} />
                </>
            ) : (
                <View style={{ gap: 10 }}>
                    <Text>Enter your phone number:</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            borderWidth: 1,
                            borderRadius: 6,
                            paddingHorizontal: 5,
                        }}>
                        <Text>+91</Text>
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="9876543210"
                            maxLength={10}
                            style={{ flex: 1, paddingVertical: 8 }}
                        />
                    </View>
                    {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                    <Button
                        title="Send OTP"
                        onPress={signInWithPhoneNumber}
                        disabled={!phone}
                    />
                </View>
            )}
        </View>
    );
}
