# 🎭 Emoji Face Match

A fun and interactive mobile game where you match facial expressions with emojis! Powered by GPT-4 Vision API for intelligent grading.

## 🎮 How to Play

1. The app shows you a random emoji
2. Take a selfie matching that emoji's expression
3. GPT-4 Vision grades your performance out of 100
4. Track your scores and improve your emoji-acting skills!

## ✨ Features

- **80+ Emojis**: Wide variety of facial expressions to match
- **AI Grading**: GPT-4 Vision provides intelligent, funny feedback
- **Game History**: Track your attempts, average score, and best score
- **Beautiful UI**: Modern design with smooth animations
- **Cross-Platform**: Works on both iOS and Android
- **Camera & Gallery**: Take a new photo or choose from your gallery

## 📋 Requirements Met

This app meets all the requirements for the creative project:

1. ✅ **Complex Layout**: Multi-component layout with cards, modals, and scrollable history
2. ✅ **Advanced State Management**: Multiple state variables (emoji, image, score, history, API key, loading states)
3. ✅ **Cross-Platform Support**: Responsive design that works on iOS and Android
4. ✅ **Modular Components**: 4 separate components (EmojiPrompt, CameraCapture, ScoreDisplay, GameHistory)
5. ✅ **Third-Party Libraries**: 
   - `@expo/vector-icons` for icons
   - `expo-camera` for camera access
   - `expo-image-picker` for image selection
   - `openai` for GPT-4 Vision API
6. ✅ **Beautiful Design**: 
   - Consistent color palette (#007AFF primary, #fafafa background)
   - Smooth animations and transitions
   - Proper spacing and visual hierarchy
   - Shadow effects and rounded corners

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (or iOS Simulator/Android Emulator)
- OpenAI API key (get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys))

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on your device:**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `i` for iOS simulator or `a` for Android emulator

4. **Configure OpenAI API Key:**
   - When you first open the app, you'll see a modal
   - Enter your OpenAI API key
   - The key is stored locally in the app's state

### Camera Permissions

The app will request camera permissions when you first try to take a photo. Make sure to allow camera access for the full experience!

## 🎨 Design Choices

### Color Palette
- **Primary Blue**: #007AFF (iOS native blue)
- **Background**: #fafafa (soft white)
- **Text**: #1a1a1a (soft black) and #666 (muted text)
- **Success**: #34C759
- **Warning**: #FF9500
- **Error**: #FF3B30

### Typography
- **Headers**: 24-32px, Bold (700)
- **Body**: 14-16px, Semi-bold (600)
- **Captions**: 10-12px, Medium (500)

### Animations
- Spring animations on button presses (< 200ms)
- Smooth fade-in on component mount
- Score display with scale and opacity animation
- All animations use native driver for 60fps performance

## 📱 Screenshots

The app features:
- Clean emoji display with refresh button
- Camera capture with loading states
- Animated score display with feedback
- Scrollable game history with statistics
- Settings modal for API key management

## 🔒 Privacy & Security

- Your OpenAI API key is only stored locally in the app
- Images are sent directly to OpenAI's API for grading
- No data is stored on external servers
- Camera permissions are only used for taking photos

## 🐛 Troubleshooting

**Camera not working?**
- Make sure you granted camera permissions
- On iOS: Settings > Privacy > Camera
- On Android: Settings > Apps > Permissions

**API errors?**
- Check that your OpenAI API key is valid
- Ensure you have credits in your OpenAI account
- Check your internet connection

**App won't start?**
- Try `npm install` again
- Clear Expo cache: `npx expo start -c`
- Make sure you have the latest Expo Go app

## 🎯 Future Enhancements

Potential features for future versions:
- Multiplayer mode
- Daily challenges
- Leaderboards
- More emoji categories
- Custom difficulty levels
- Video mode for dynamic expressions

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Credits

- Built with React Native & Expo
- AI grading powered by OpenAI GPT-4 Vision
- Icons from @expo/vector-icons
- Design inspired by iOS Human Interface Guidelines

---

Made with ❤️ for the creative project assignment

