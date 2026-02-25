import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ConnectBank() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'connecting' | 'done'>('idle');

  async function handleConnect() {
    setStatus('connecting');

    // TODO: Replace with real Plaid Link flow
    // 1. Call backend /api/plaid/create-link-token
    // 2. Open Plaid Link with the token
    // 3. On success, call backend /api/plaid/exchange-token
    // 4. Store connection status

    // Simulate connection delay
    setTimeout(() => {
      setStatus('done');
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{'\u{1F3E6}'}</Text>
        <Text style={styles.title}>Connect Your Bank</Text>
        <Text style={styles.description}>
          Link your bank account so Dog can check your balance and spending
          before you make a purchase. We use Plaid to securely connect — we
          never see your login credentials.
        </Text>

        <View style={styles.features}>
          {[
            'Real-time balance checks',
            'Spending pattern analysis',
            'Bill and subscription tracking',
            'Personalized vibe checks',
          ].map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Text style={styles.checkmark}>{'\u2713'}</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {status === 'idle' && (
          <TouchableOpacity style={styles.connectBtn} onPress={handleConnect}>
            <Text style={styles.connectBtnText}>Connect with Plaid</Text>
          </TouchableOpacity>
        )}

        {status === 'connecting' && (
          <View style={[styles.connectBtn, styles.connectingBtn]}>
            <Text style={styles.connectBtnText}>Connecting...</Text>
          </View>
        )}

        {status === 'done' && (
          <>
            <View style={[styles.connectBtn, styles.doneBtn]}>
              <Text style={styles.connectBtnText}>
                {'\u2713'} Connected (placeholder)
              </Text>
            </View>
            <TouchableOpacity
              style={styles.doneLink}
              onPress={() => router.back()}
            >
              <Text style={styles.doneLinkText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.footer}>
        Secured by Plaid. Your data is encrypted and never shared.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1f2937', marginBottom: 8 },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },

  features: { width: '100%', marginBottom: 24 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checkmark: { fontSize: 16, color: '#10b981', fontWeight: '700' },
  featureText: { fontSize: 14, color: '#374151' },

  connectBtn: {
    width: '100%',
    backgroundColor: '#0a85ea',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  connectingBtn: { backgroundColor: '#6b7280' },
  doneBtn: { backgroundColor: '#10b981' },

  doneLink: { marginTop: 16 },
  doneLinkText: { color: '#3b82f6', fontSize: 14, fontWeight: '600' },

  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 20,
  },
});
