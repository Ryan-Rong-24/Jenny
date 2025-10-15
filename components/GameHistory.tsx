import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface GameRecord {
  id: string;
  emoji: string;
  emojiName: string;
  score: number;
  timestamp: Date;
}

interface GameHistoryProps {
  history: GameRecord[];
  onClear: () => void;
}

export default function GameHistory({ history, onClear }: GameHistoryProps) {
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

  if (history.length === 0) {
    return null;
  }

  const averageScore = Math.round(
    history.reduce((sum, record) => sum + record.score, 0) / history.length
  );

  const bestScore = Math.max(...history.map(record => record.score));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Stats</Text>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            onPress={onClear}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.clearButton}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{history.length}</Text>
          <Text style={styles.statLabel}>Attempts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{averageScore}</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{bestScore}</Text>
          <Text style={styles.statLabel}>Best Score</Text>
        </View>
      </View>

      <Text style={styles.historyTitle}>Recent Attempts</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.historyScroll}
      >
        {history.slice().reverse().map((record) => (
          <View key={record.id} style={styles.historyItem}>
            <Text style={styles.historyEmoji}>{record.emoji}</Text>
            <Text style={styles.historyScore}>{record.score}</Text>
            <Text style={styles.historyName}>{record.emojiName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  clearButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff0f0',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  historyScroll: {
    gap: 12,
  },
  historyItem: {
    width: 100,
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  historyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  historyScore: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  historyName: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

