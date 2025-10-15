# 🚀 Quick Start Guide

## Step 1: Install Node.js

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/) (LTS version recommended).

Verify installation:
```bash
node --version
npm --version
```

## Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd /Users/ryanrong/Documents/GitHub/Jenny
npm install
```

This will install:
- Expo framework
- React Native
- expo-camera (for camera access)
- expo-image-picker (for gallery access)
- @expo/vector-icons (for beautiful icons)
- OpenAI SDK (for GPT-4 Vision grading)

## Step 3: Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy the key (starts with `sk-`)
6. Keep it safe - you'll enter it in the app!

**Important**: Make sure you have credits in your OpenAI account. The app uses GPT-4 Vision API which requires a paid account.

## Step 4: Start the App

Run the Expo development server:

```bash
npx expo start
```

This will show you a QR code and several options:

- **iOS**: Press `i` to open in iOS Simulator (requires Xcode on Mac)
- **Android**: Press `a` to open in Android Emulator (requires Android Studio)
- **Physical Device**: 
  - Install "Expo Go" app from App Store or Google Play
  - Scan the QR code with your phone's camera (iOS) or Expo Go app (Android)

## Step 5: Configure API Key

When you first open the app:
1. A modal will appear asking for your OpenAI API key
2. Paste your API key (the one starting with `sk-`)
3. Tap "Save & Continue"
4. You're ready to play!

## Troubleshooting

### "command not found: npx"
You need to install Node.js first (see Step 1).

### "Cannot find module..."
Run `npm install` again to ensure all dependencies are installed.

### Camera not working
- Grant camera permissions when prompted
- On iOS: Settings > Privacy & Security > Camera > Expo Go
- On Android: Settings > Apps > Expo Go > Permissions > Camera

### API errors
- Verify your API key is correct
- Check you have credits: [platform.openai.com/usage](https://platform.openai.com/usage)
- Ensure you have internet connection

### App crashes on startup
Try clearing the cache:
```bash
npx expo start -c
```

## Development Tips

### Reload the app
- Shake your device to open the developer menu
- Press `r` in the terminal to reload
- Press `j` to open Chrome DevTools

### Clear cache
```bash
npx expo start -c
```

### View logs
```bash
npx expo start
# Then press 'j' to open Chrome DevTools
```

## Project Structure

```
Jenny/
├── App.tsx                 # Main app component
├── components/
│   ├── EmojiPrompt.tsx    # Shows current emoji to match
│   ├── CameraCapture.tsx  # Camera/gallery interface
│   ├── ScoreDisplay.tsx   # Shows AI grading results
│   └── GameHistory.tsx    # Displays game statistics
├── utils/
│   ├── emojis.ts          # List of 80+ emojis
│   └── openai.ts          # GPT-4 Vision integration
├── assets/                # App icons and splash screens
├── package.json           # Dependencies
├── app.json              # Expo configuration
└── README.md             # Full documentation
```

## What's Next?

Once your app is running:
1. The app will show you a random emoji
2. Tap "Take Photo" to capture your face
3. Make the emoji expression!
4. GPT-4 Vision will grade your performance
5. Try to beat your high score!

Have fun! 🎭✨

