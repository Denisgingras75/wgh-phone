import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import type { Transaction } from '@/lib/api';

// Placeholder data — will come from Plaid
const MOCK_TRANSACTIONS: Transaction[] = [
  { date: '2026-02-25', name: 'Starbucks', amount: 6.45, category: 'Food' },
  { date: '2026-02-24', name: 'Amazon', amount: 47.99, category: 'Shopping' },
  { date: '2026-02-24', name: 'Spotify', amount: 10.99, category: 'Subscription' },
  { date: '2026-02-23', name: 'Chipotle', amount: 12.50, category: 'Food' },
  { date: '2026-02-22', name: 'Netflix', amount: 15.99, category: 'Subscription' },
  { date: '2026-02-22', name: 'Gas Station', amount: 42.00, category: 'Transport' },
  { date: '2026-02-21', name: 'Uber Eats', amount: 28.40, category: 'Food' },
  { date: '2026-02-20', name: 'Target', amount: 63.21, category: 'Shopping' },
  { date: '2026-02-19', name: 'Gym Membership', amount: 49.99, category: 'Health' },
  { date: '2026-02-18', name: 'Apple iCloud', amount: 2.99, category: 'Subscription' },
  { date: '2026-02-17', name: 'Whole Foods', amount: 87.32, category: 'Groceries' },
  { date: '2026-02-16', name: 'Electric Bill', amount: 124.00, category: 'Utilities' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#f59e0b',
  Shopping: '#3b82f6',
  Subscription: '#8b5cf6',
  Transport: '#6366f1',
  Health: '#10b981',
  Groceries: '#14b8a6',
  Utilities: '#64748b',
};

type Filter = 'all' | 'Food' | 'Shopping' | 'Subscription';

export default function Transactions() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all'
      ? MOCK_TRANSACTIONS
      : MOCK_TRANSACTIONS.filter((tx) => tx.category === filter);

  const total = filtered.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <View style={styles.container}>
      {/* Filter chips */}
      <View style={styles.filters}>
        {(['all', 'Food', 'Shopping', 'Subscription'] as Filter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.chipActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[styles.chipText, filter === f && styles.chipTextActive]}
            >
              {f === 'all' ? 'All' : f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>
          Total ({filtered.length} transactions)
        </Text>
        <Text style={styles.totalValue}>-${total.toFixed(2)}</Text>
      </View>

      {/* Transaction list */}
      <FlatList
        data={filtered}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <View
              style={[
                styles.txDot,
                {
                  backgroundColor:
                    CATEGORY_COLORS[item.category] || '#9ca3af',
                },
              ]}
            />
            <View style={styles.txInfo}>
              <Text style={styles.txName}>{item.name}</Text>
              <Text style={styles.txMeta}>
                {item.category} &middot; {item.date}
              </Text>
            </View>
            <Text style={styles.txAmount}>-${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  filters: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    paddingBottom: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  chipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipText: { fontSize: 13, color: '#374151', fontWeight: '500' },
  chipTextActive: { color: '#fff' },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  totalLabel: { fontSize: 14, color: '#6b7280' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#ef4444' },

  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#fff',
  },
  txDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  txInfo: { flex: 1 },
  txName: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  txMeta: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: '700', color: '#ef4444' },
});
