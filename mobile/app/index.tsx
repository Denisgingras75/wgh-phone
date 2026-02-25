import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { VIBE_CONFIGS, getPlaceholderVibe } from '@/lib/vibes';
import type { VibeLevel, Transaction } from '@/lib/api';

// Placeholder data — will come from Plaid via backend
const MOCK_BALANCE = 2847.32;
const MOCK_SPENT_THIS_WEEK = 387.10;
const MOCK_RECENT: Transaction[] = [
  { date: '2026-02-24', name: 'Amazon', amount: 47.99, category: 'Shopping' },
  { date: '2026-02-23', name: 'Chipotle', amount: 12.50, category: 'Food' },
  { date: '2026-02-22', name: 'Netflix', amount: 15.99, category: 'Subscription' },
];

export default function Dashboard() {
  const router = useRouter();
  const [vibe, setVibe] = useState<VibeLevel>('green');
  const [balance] = useState(MOCK_BALANCE);
  const [spentThisWeek] = useState(MOCK_SPENT_THIS_WEEK);

  useEffect(() => {
    setVibe(getPlaceholderVibe(spentThisWeek, balance));
  }, [spentThisWeek, balance]);

  const vibeConfig = VIBE_CONFIGS[vibe];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Vibe Card */}
      <View style={styles.vibeCard}>
        <View
          style={[
            styles.vibeGradient,
            { backgroundColor: vibeConfig.gradient[0] },
          ]}
        >
          <Text style={styles.vibeEmoji}>{vibeConfig.emoji}</Text>
          <Text style={styles.vibeLabel}>{vibeConfig.label}</Text>
          <Text style={styles.vibeMessage}>{vibeConfig.message}</Text>
        </View>
      </View>

      {/* Balance & Spending */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={styles.statValue}>${balance.toLocaleString()}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Spent This Week</Text>
          <Text style={[styles.statValue, { color: '#ef4444' }]}>
            ${spentThisWeek.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {MOCK_RECENT.map((tx, i) => (
          <View key={i} style={styles.txRow}>
            <View>
              <Text style={styles.txName}>{tx.name}</Text>
              <Text style={styles.txCategory}>{tx.category}</Text>
            </View>
            <Text style={styles.txAmount}>-${tx.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.chatBtn]}
          onPress={() => router.push('/chat')}
        >
          <Text style={styles.actionBtnText}>Ask Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.connectBtn]}
          onPress={() => router.push('/connect')}
        >
          <Text style={styles.connectBtnText}>Connect Bank</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 20, paddingBottom: 40 },

  vibeCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  vibeGradient: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 20,
  },
  vibeEmoji: { fontSize: 48, marginBottom: 8 },
  vibeLabel: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  vibeMessage: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: { fontSize: 13, color: '#6b7280', marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '700', color: '#1f2937' },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1f2937' },
  seeAll: { fontSize: 14, color: '#3b82f6', fontWeight: '600' },

  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  txName: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  txCategory: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  txAmount: { fontSize: 16, fontWeight: '700', color: '#ef4444' },

  actions: { gap: 10 },
  actionBtn: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  chatBtn: { backgroundColor: '#3b82f6' },
  actionBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  connectBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  connectBtnText: { fontSize: 16, fontWeight: '700', color: '#374151' },
});
