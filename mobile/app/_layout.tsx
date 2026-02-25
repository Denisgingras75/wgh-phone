import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  registerForPushNotifications,
  onNotificationReceived,
  onNotificationTapped,
} from '@/lib/notifications';

export default function RootLayout() {
  useEffect(() => {
    // Register for push notifications on mount
    registerForPushNotifications();

    // Handle notifications received while app is open
    const receivedSub = onNotificationReceived((notification) => {
      console.log('Notification received:', notification);
    });

    // Handle notification taps
    const tappedSub = onNotificationTapped((response) => {
      console.log('Notification tapped:', response);
      // TODO: Navigate to relevant screen based on notification data
    });

    return () => {
      receivedSub.remove();
      tappedSub.remove();
    };
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#f9fafb' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Dog Don\'t Do It' }}
        />
        <Stack.Screen
          name="transactions"
          options={{ title: 'Transactions' }}
        />
        <Stack.Screen
          name="chat"
          options={{ title: 'Ask Dog' }}
        />
        <Stack.Screen
          name="connect"
          options={{ title: 'Connect Bank', presentation: 'modal' }}
        />
      </Stack>
    </>
  );
}
