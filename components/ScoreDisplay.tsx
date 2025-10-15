import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

interface ScoreDisplayProps {
  score: number | null;
  feedback: string;
}

export default function ScoreDisplay({ score, feedback }: ScoreDisplayProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (score !== null) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [score]);

  if (score === null) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#34C759';
    if (score >= 60) return '#FF9500';
    if (score >= 40) return '#FF9500';
    return '#FF3B30';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 80) return '🎉';
    if (score >= 70) return '😊';
    if (score >= 60) return '👍';
    if (score >= 40) return '😐';
    return '😅';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Perfect Match!';
    if (score >= 80) return 'Excellent!';
    if (score >= 70) return 'Great Job!';
    if (score >= 60) return 'Good Effort!';
    if (score >= 40) return 'Not Bad!';
    return 'Keep Trying!';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={[styles.scoreCircle, { borderColor: getScoreColor(score) }]}>
        <Text style={styles.scoreEmoji}>{getScoreEmoji(score)}</Text>
        <Text style={[styles.scoreText, { color: getScoreColor(score) }]}>
          {score}
        </Text>
        <Text style={styles.scoreSubtext}>/ 100</Text>
      </View>
      
      <Text style={styles.label}>{getScoreLabel(score)}</Text>
      
      {feedback && (
        <View style={styles.feedbackContainer}>
          <Image source={require('../assets/chat.png')} style={{ width: 20, height: 20, tintColor: '#007AFF' }} />
          <Text style={styles.feedback}>{feedback}</Text>
        </View>
      )}
    </Animated.View>
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
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  scoreEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
  },
  scoreSubtext: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  label: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  feedback: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

