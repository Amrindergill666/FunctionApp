/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
  View,
  Text
} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import OneMsg from './compoents/onesignal';
import LottieView from 'lottie-react-native';
import Native from './compoents/native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RefreshButton from './compoents/restart';
import {
  CopilotProvider,
  CopilotStep,
  useCopilot,
  walkthroughable,
} from 'react-native-copilot';
import { SafeAreaView } from 'react-native-safe-area-context';

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
const Stack = createNativeStackNavigator();

function App() {
  // For status Bar padding issue
  const isAndroid13OrHigher =
    Platform.OS === 'android' && Platform.Version >= 33;
  const topPadding = isAndroid13OrHigher ? StatusBar.currentHeight : 0;

  //  FCM permmision

  // useEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, [])

  // for theming

  const isDarkMode = useColorScheme();
  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2196f3',
      background: '#fff',
      card: '#fafafa',
      text: '#222',
      // Add or override more colors
    },
  };
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#bb86fc',
      background: '#121212',
      card: '#222',
      text: '#fff',
    },
  };
  function Apps() {
    const { start, copilotEvents } = useCopilot();
    const [secondStepActive, setSecondStepActive] = useState(true);
    console.log('secondStepActive: ', secondStepActive, ' (line: 89)');
    const [lastEvent, setLastEvent] = useState(null);
    console.log('lastEvent: ', lastEvent, ' (line: 91)');

    useEffect(() => {
      copilotEvents.on('stepChange', step => {
        setLastEvent(`stepChange: ${step.name}`);
      });
      copilotEvents.on('start', () => {
        setLastEvent(`start`);
      });
      copilotEvents.on('stop', () => {
        setLastEvent(`stop`);
      });
    }, [copilotEvents]);
    const WalkthroughableText = walkthroughable(Text);
    const WalkthroughableImage = walkthroughable(Image);

    return (
      <SafeAreaView style={styles.container}>
        <CopilotStep
          text="Hey! This is the first step of the tour!"
          order={1}
          name="openApp"
        >
          <WalkthroughableText style={styles.title}>
            {'Welcome to the demo of\n"React Native Copilot"'}
          </WalkthroughableText>
        </CopilotStep>
        <View style={styles.middleView}>
          <CopilotStep
            active={secondStepActive}
            text="Here goes your profile picture!"
            order={2}
            name="secondText"
          >
            <WalkthroughableImage
              source={{
                uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg',
              }}
              style={styles.profilePhoto}
            />
          </CopilotStep>
          <View style={styles.activeSwitchContainer}>
            <Text style={{ color: 'black' }}>
              Profile photo step activated?
            </Text>
            <View style={{ flexGrow: 1 }} />
            <Switch
              onValueChange={secondStepActive =>
                setSecondStepActive(secondStepActive)
              }
              value={secondStepActive}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => start()}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>
          <View style={styles.eventContainer}>
            <Text>{lastEvent && `Last event: ${lastEvent}`}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <CopilotStep
            text="Here is an item in the corner of the screen."
            order={3}
            name="thirdText"
          >
            <WalkthroughableText style={styles.tabItem}>
              {/* <Ionicons name="apps" size={25} color="#888" /> */}
              <Text>Apps</Text>
            </WalkthroughableText>
          </CopilotStep>

          {/* <Ionicons
            style={styles.tabItem}
            name="airplane"
            size={25}
            color="#888"
          />
          <Ionicons
            style={styles.tabItem}
            name="ios-globe"
            size={25}
            color="#888"
          />
          <Ionicons
            style={styles.tabItem}
            name="ios-navigate-outline"
            size={25}
            color="#888"
          /> */}

          {/* <Ionicons
            style={styles.tabItem}
            name="ios-rainy"
            size={25}
            color="#888"
          /> */}
        </View>
      </SafeAreaView>
    );
  }

  if (false) {
    return (
      <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
        <Apps />
      </CopilotProvider>
    );
  }
  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer
          theme={isDarkMode == 'dark' ? MyDarkTheme : MyLightTheme}
        >
          <Stack.Navigator>
            <Stack.Screen name="Native" component={Native} />
            <Stack.Screen name="RefreshButton" component={RefreshButton} />
            {/* Add more screens as needed */}
          </Stack.Navigator>
        </NavigationContainer>
      {/* <NewAppScreen templateFileName="App.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor:'red'
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  eventContainer: {
    marginTop: 20,
  },
});

export default App;
