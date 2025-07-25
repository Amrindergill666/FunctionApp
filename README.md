# 🎯 **Function App** – React Native App

Welcome to **Function App**, a robust and modern React Native application integrating Firebase, biometric authentication, native sensors, translations, push notifications, theming, and UI testing — built for scale and performance.

---

## 🚀 Getting Started

Follow these steps to set up and run the app on your local machine.

---

### 🧱 Prerequisites

- 🟢 **Node.js** (LTS)
- 📦 **npm** or **yarn**
- ⚛️ **React Native CLI**
- 🛠️ **Android Studio / Xcode**
- 🔥 **Firebase Project**
- 📱 Physical device (for camera/sensors/BioAuth testing)
- ✅ **Maestro CLI** (for UI testing)

---

## 🔥 Firebase Setup

> Firebase powers authentication, database, push, and more.

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project or use existing
3. Add Android/iOS apps
4. Download:
   - `google-services.json` → `android/app/`
   - `GoogleService-Info.plist` → `ios/`
5. Enable:
   - 🔐 Auth (Email/Password, Google, Phone)
   - ☁️ Firestore / Realtime DB
   - 🔔 Cloud Messaging (FCM)

---

## 🧩 Features

| Feature                        | Description |
|-------------------------------|-------------|
| 🔐 **BioAuth**                | Fingerprint/Face unlock |
| 🟦 **Google Auth**            | Sign-in with Google |
| 🔑 **Phone Login**            | Firebase OTP login |
| 📷 **Vision Camera**          | High-performance camera |
| 💥 **Haptics & Vibration**    | Native feedback APIs |
| 🎛️ **Sensors**               | Accelerometer, Gyroscope |
| 🔁 **Refresh Button**         | Manual data refresher |
| 🌍 **Translation**            | Multilingual support |
| 🔔 **Push via OneSignal**     | FCM + OneSignal |
| 🧪 **Maestro Testing**        | UI test with `maestro.yaml` |
| 🌓 **Theming**                | Light/Dark toggle |
| 🧱 **StatusBar Fix**          | Android 13+ safe handling |

📁 All logic is modular and lives inside `/components/` — each file has library info, usage, and setup comments.

---

## 📦 Install Dependencies

```bash
npm install
# or
yarn install
```

---

## ▶️ Run the App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

---

## 🧱 StatusBar Handling (Android 13+)

To avoid layout shifts due to StatusBar on newer Androids, the following logic is used:

```js
const isAndroid13OrHigher = Platform.OS === 'android' && Platform.Version >= 33;
const topPadding = isAndroid13OrHigher ? StatusBar.currentHeight : 0;
```

Then applied to your main container:

```js
<View style={[styles.container, { paddingTop: topPadding }]}>
  <StatusBar barStyle="dark-content" />
</View>
```

✅ This ensures proper padding and avoids overlay glitches on Android 13+.

---

## 🌗 Theme Switching (Dark/Light Mode)

Theme logic is implemented using `useColorScheme()` and customized React Navigation themes:

```js
const isDarkMode = useColorScheme();

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};
```

Used in navigation container like so:

```js
<NavigationContainer theme={isDarkMode === 'dark' ? MyDarkTheme : MyLightTheme}>
  {/* App navigation */}
</NavigationContainer>
```

✅ Easily extendable and fully system-aware.

---

## 🧪 Maestro UI Testing

> Script-based UI testing with [Maestro](https://maestro.mobile.dev/)

File: `maestro.yaml` (root)

Run tests:

```bash
maestro test maestro.yaml
```

---

## 📁 Folder Structure

```
FunctionApp/
│
├── android/
├── ios/
├── components/
│   ├── BioAuth.js
│   ├── GoogleAuth.js
│   ├── PhoneNumber.js
│   ├── Camera.js
│   ├── Haptic.js
│   ├── Sensors.js
│   ├── translator.js
│   ├── Restart.js
│   ├── vibration.js
│   └── ...
├── maestro.yaml
├── App.js ← Contains theme & status bar logic
└── ...
```

📝 All component files are documented with setup steps, package names, and examples.

---

## 💡 Tips

- Test biometric, camera, and sensors on **physical devices**
- OneSignal must be linked with Firebase for push
- Use `.env` to manage sensitive data cleanly

---

## 🧑‍💻 Contributing

Want to improve this app? Fork, branch, and open a PR — all help is welcome 🙌

---

## 📜 License

MIT © Amrinder singh

---

> Built with ❤️ using **React Native, Firebase, and native APIs**
