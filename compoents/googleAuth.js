import React, { useEffect, useState } from 'react';
import { View, Button, Text, ActivityIndicator, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

/* 
    Setup of this library
    1. Install the library:
        npm install @react-native-google-signin/google-signin @react-native-firebase/auth
    2. Follow the setup instructions for Google Sign-In:
        https://rnfirebase.io/auth/usage#google-sign-in
    3. Add your web client ID in the WEB_CLIENT_ID constant below.
    4. Make sure to configure your Firebase project to support Google Sign-In.
    5. For Android, ensure you have the correct SHA-1 fingerprint set up in your Firebase console.
    6. For iOS, ensure you have the correct URL schemes set up in your Info.plist.

*/


const WEB_CLIENT_ID = '2144242XXXXXXXX.XXXXXXXXXXXX.apps.googleusercontent.com'; // <- Replace with yours!

export default function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
        });

        const unsubscribe = auth().onAuthStateChanged(u => {
            setUser(u);
        });
        return unsubscribe;
    }, []);

    async function onGoogleButtonPress() {
        setLoading(true);
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const account = await GoogleSignin.signIn();
            const { idToken } = account.data || {};
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential);

            console.log(' (line: 37)');
            // User is signed in now
        } catch (error) {
            console.error('error: ', error, ' (line: 32)');
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled
                Alert.alert('Cancelled', 'Google sign-in was cancelled.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Please wait', 'Sign-in is already in progress.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('No Play Services', 'Google Play Services not available or outdated.');
            } else {
                Alert.alert('Google Sign-In Error', error.message);
            }
        }
        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (e) { }
        setLoading(false);
    }

    return (
        <View style={{ padding: 32, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            {loading && <ActivityIndicator color="#222" />}
            {user ? (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, marginBottom: 12 }}>Welcome, {user.displayName || user.email}!</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            ) : (
                <Button title="Sign in with Google" onPress={onGoogleButtonPress} />
            )}
        </View>
    );
}
