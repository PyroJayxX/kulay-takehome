# KulayCart

A simple Add to Cart app built with React Native for the Kulay take-home assessment. 

**APK download:** [REPLACE WITH GITHUB RELEASE LINK]

![KulayCart mockup](assets/images/mockup.png)

## Features

- Products list with 5 static products
- Add to cart functionality with quantity controls
- Live item count and total 
- Voucher codes with a discounted total

## Tech stack

- Expo SDK 58, Expo Router, TypeScript
- NativeWind v4 (Tailwind CSS for React Native)

## Run locally

```bash
npm install
npx expo start
```

Then pick one:

- **Android emulator:** start a virtual device from Android Studio's Device Manager (or `emulator -avd <name>`, list names with `emulator -list-avds`), then press `a` in the terminal running Expo.
- **Physical device:** install Expo Go, make sure the phone is on the same Wi-Fi as your computer, and scan the QR code.
- **APK:** install the APK from the download link at the top of this file.