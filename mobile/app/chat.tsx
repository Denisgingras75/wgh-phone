import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const QUICK_ACTIONS = [
  'Can I afford this?',
  'What did I spend this week?',
  'What bills are coming up?',
  "What's my balance?",
];

// Placeholder responses — will be replaced with Claude API calls
function getPlaceholderReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('afford'))
    return "Based on your balance, you're looking okay — but you've been spending a lot this week. Maybe sleep on it?";
  if (lower.includes('spend') || lower.includes('spent'))
    return "You've dropped about $387 this week — mostly food, shopping, and subscriptions. It adds up quick.";
  if (lower.includes('bill') || lower.includes('recurring'))
    return "You've got rent ($1,200) on the 1st, Netflix ($15.99) on the 3rd, and Spotify ($10.99) on the 5th.";
  if (lower.includes('balance'))
    return "Your checking account is at $2,847.32. After upcoming bills, you'll have about $1,620 free.";
  return "I hear you! Once Plaid is connected I'll give you real numbers. For now, just vibes.";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "What's up! I'm Dog — ask me anything about your spending. Once your bank is connected, I'll have real numbers.",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI response delay
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getPlaceholderReply(text),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.messages}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgBubble,
              item.sender === 'user' ? styles.userMsg : styles.botMsg,
            ]}
          >
            <Text
              style={[
                styles.msgText,
                item.sender === 'user' ? styles.userText : styles.botText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Quick actions */}
      <View style={styles.quickActions}>
        {QUICK_ACTIONS.map((q) => (
          <TouchableOpacity
            key={q}
            style={styles.quickChip}
            onPress={() => sendMessage(q)}
          >
            <Text style={styles.quickChipText}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your spending..."
          placeholderTextColor="#9ca3af"
          onSubmitEditing={() => sendMessage(input)}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => sendMessage(input)}
        >
          <Text style={styles.sendBtnText}>{'\u2191'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  messages: { padding: 16, paddingBottom: 8 },
  msgBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  userMsg: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botMsg: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  msgText: { fontSize: 15, lineHeight: 21 },
  userText: { color: '#fff' },
  botText: { color: '#1f2937' },

  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  quickChipText: { fontSize: 12, color: '#374151' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#f9fafb',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
