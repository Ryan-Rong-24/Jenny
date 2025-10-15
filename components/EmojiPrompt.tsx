import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image } from 'react-native';

interface EmojiPromptProps {
  emoji: string;
  emojiName: string;
  onRefresh: () => void;
}

export default function EmojiPrompt({ emoji, emojiName, onRefresh }: EmojiPromptProps) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match This Emoji!</Text>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.emojiName}>{emojiName}</Text>
      
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable
          style={styles.refreshButton}
          onPress={onRefresh}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image source={require('../assets/refresh.png')} style={{ width: 20, height: 20, tintColor: '#fff' }} />
          <Text style={styles.refreshButtonText}>New Emoji</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  emojiContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#fafafa',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#f0f0f0',
  },
  emoji: {
    fontSize: 100,
  },
  emojiName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

