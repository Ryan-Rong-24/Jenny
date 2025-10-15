import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar, Alert, Pressable, Text as RNText, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import EmojiPrompt from './components/EmojiPrompt';
import CameraCapture from './components/CameraCapture';
import ScoreDisplay from './components/ScoreDisplay';
import GameHistory, { GameRecord } from './components/GameHistory';
import { getRandomEmoji, EmojiData } from './utils/emojis';
import { gradeEmojiMatch } from './utils/openai';

// Read API key from environment variable
const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY || process.env.OPENAI_API_KEY || '';

export default function App() {
  const [currentEmoji, setCurrentEmoji] = useState<EmojiData>(getRandomEmoji());
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);
  const [apiKeyError, setApiKeyError] = useState<boolean>(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Check if API key is set
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-api-key-here') {
      setApiKeyError(true);
      Alert.alert(
        'API Key Required',
        'Please add your OpenAI API key to the .env file.\n\nCreate a .env file in the project root with:\nOPENAI_API_KEY=your-key-here',
        [{ text: 'OK' }]
      );
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRefreshEmoji = () => {
    setCurrentEmoji(getRandomEmoji());
    setCapturedImage(null);
    setScore(null);
    setFeedback('');
  };

  const handleImageCapture = async (uri: string) => {
    setCapturedImage(uri);
    setScore(null);
    setFeedback('');

    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-api-key-here') {
      Alert.alert(
        'API Key Required',
        'Please add your OpenAI API key to the .env file and restart the app.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await gradeEmojiMatch(
        uri,
        currentEmoji.emoji,
        currentEmoji.name,
        OPENAI_API_KEY
      );
      
      setScore(result.score);
      setFeedback(result.feedback);

      // Add to game history
      const newRecord: GameRecord = {
        id: Date.now().toString(),
        emoji: currentEmoji.emoji,
        emojiName: currentEmoji.name,
        score: result.score,
        timestamp: new Date(),
      };
      setGameHistory(prev => [...prev, newRecord]);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      Alert.alert(
        'Oops!',
        `Failed to grade your emoji match: ${errorMessage}\n\nPlease check your API key and internet connection.`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all game history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => setGameHistory([]),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.headerTitle}>Emoji Face Match</RNText>
              <RNText style={styles.headerSubtitle}>Can you match the emoji? 🤔</RNText>
            </View>
            {apiKeyError && (
              <View style={styles.errorBadge}>
                <Ionicons name="warning" size={20} color="#FF3B30" />
              </View>
            )}
          </View>

          {/* Emoji Prompt */}
          <EmojiPrompt
            emoji={currentEmoji.emoji}
            emojiName={currentEmoji.name}
            onRefresh={handleRefreshEmoji}
          />

          {/* Camera Capture */}
          <CameraCapture
            onCapture={handleImageCapture}
            isLoading={isLoading}
            capturedImage={capturedImage}
          />

          {/* Score Display */}
          <ScoreDisplay score={score} feedback={feedback} />

          {/* Game History */}
          <GameHistory history={gameHistory} onClear={handleClearHistory} />

          {/* Footer spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  errorBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

