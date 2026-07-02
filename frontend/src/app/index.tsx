import { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../store/auth.store';

export default function SplashScreen() {
  const initialize = useAuthStore((s) => s.initialize);

  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 400, delay: 100, useNativeDriver: true }),
    ]).start();

    const checkAuth = async () => {
      const [destination] = await Promise.all([
        initialize(),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);

      // Three possible destinations
      if (destination === 'dashboard') {
        router.replace('/(tabs)/dashboard');
      } else if (destination === 'onboarding') {
        router.replace('/(onboarding)');
      } else {
        router.replace('/(auth)/login');
      }
    };

    checkAuth();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.View
        style={{ transform: [{ scale: logoScale }], opacity: logoOpacity }}
        className="items-center"
      >
        <View className="w-20 h-20 rounded-3xl bg-emerald-500 items-center justify-center mb-4">
          <Text className="text-4xl font-bold text-white">₹</Text>
        </View>
        <Text className="text-3xl font-bold text-gray-900 tracking-tight">
          ArthSaathi
        </Text>
      </Animated.View>

      <Animated.Text
        style={{ opacity: taglineOpacity }}
        className="text-base text-gray-400 mt-3"
      >
        Your money, your future
      </Animated.Text>
    </View>
  );
}