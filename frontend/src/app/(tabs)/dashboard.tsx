import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../components/layout/Screen';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store/auth.store';

// Placeholder — full Dashboard will be built in Sprint 3
export default function DashboardScreen() {
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await clearAuth();           // wipes SecureStore
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <Screen padded>
      <View className="pt-4 pb-6">
        <Text className="text-2xl font-bold text-gray-900">
          Hello, {user?.name?.split(' ')[0] ?? 'there'} 👋
        </Text>
        <Text className="text-base text-gray-500 mt-1">
          Your financial journey continues
        </Text>
      </View>

      <Card variant="elevated" className="mb-4">
        <View className="flex-row items-center gap-3 mb-3">
          <View className="w-10 h-10 rounded-full bg-emerald-100 items-center justify-center">
            <Text className="text-lg">🤖</Text>
          </View>
          <View>
            <Text className="text-sm font-semibold text-gray-900">Future You says</Text>
            <Text className="text-xs text-gray-500">2035</Text>
          </View>
        </View>
        <Text className="text-sm text-gray-700 leading-6">
          "Hi {user?.name?.split(' ')[0] ?? 'there'}. If you save ₹3,000/month from today, you'll reach your first goal 8 months early."
        </Text>
      </Card>

      <Card variant="outlined" className="mb-6">
        <Text className="text-sm font-semibold text-gray-900 mb-1">Auth status</Text>
        <Text className="text-xs text-gray-500 font-mono">
          Token stored in SecureStore ✓
        </Text>
        <Text className="text-xs text-gray-400 mt-1">
          Logged in as {user?.email ?? 'unknown'}
        </Text>
      </Card>

      <Text className="text-xs text-gray-400 text-center mb-4">
        Full dashboard coming in Sprint 3
      </Text>

      <Button label="Log out" variant="outline" fullWidth onPress={handleLogout} />
    </Screen>
  );
}