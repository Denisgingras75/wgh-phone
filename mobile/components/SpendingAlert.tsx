/**
 * SpendingAlert — full-screen overlay that appears when a transaction
 * is detected via Plaid webhook. Shows the vibe check with transaction details.
 *
 * This is the mobile equivalent of the Chrome extension's notification bubble.
 * Triggered by push notifications from the backend when Plaid detects a charge.
 */
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { VIBE_CONFIGS } from '@/lib/vibes';
import type { VibeLevel } from '@/lib/api';

interface SpendingAlertProps {
  visible: boolean;
  vibe: VibeLevel;
  merchantName: string;
  amount: number;
  balance: number;
  onDismiss: () => void;
  onAskDog: () => void;
}

export default function SpendingAlert({
  visible,
  vibe,
  merchantName,
  amount,
  balance,
  onDismiss,
  onAskDog,
}: SpendingAlertProps) {
  const config = VIBE_CONFIGS[vibe];

  // Trigger haptic feedback based on vibe level
  if (visible) {
    if (vibe === 'red') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else if (vibe === 'yellow') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Vibe header */}
          <View
            style={[styles.header, { backgroundColor: config.gradient[0] }]}
          >
            <Text style={styles.emoji}>{config.emoji}</Text>
            <Text style={styles.vibeLabel}>{config.label}</Text>
            <Text style={styles.vibeMessage}>{config.message}</Text>
          </View>

          {/* Transaction details */}
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Purchase</Text>
              <Text style={styles.detailValue}>{merchantName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={[styles.detailValue, styles.amountText]}>
                -${amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Balance After</Text>
              <Text style={styles.detailValue}>
                ${(balance - amount).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, styles.askBtn]}
              onPress={onAskDog}
            >
              <Text style={styles.askBtnText}>Ask Dog</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.dismissBtn]}
              onPress={onDismiss}
            >
              <Text style={styles.dismissBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 16,
  },
  header: {
    padding: 28,
    alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 8 },
  vibeLabel: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  vibeMessage: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },

  details: { padding: 20 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: { fontSize: 14, color: '#6b7280' },
  detailValue: { fontSize: 16, fontWeight: '700', color: '#1f2937' },
  amountText: { color: '#ef4444' },

  actions: { padding: 20, paddingTop: 8, gap: 10 },
  btn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  askBtn: { backgroundColor: '#3b82f6' },
  askBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dismissBtn: {
    backgroundColor: '#f3f4f6',
  },
  dismissBtnText: { color: '#374151', fontSize: 16, fontWeight: '600' },
});
