import { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth.store';

// ─── Validation schema ────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

// ─── Mock login — swap this for your real Axios call when backend is ready ───
async function mockLoginApi(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 1200)); // simulate network

  // Remove this block and replace with: const res = await api.post('/auth/login', { email, password })
  if (email === 'test@vesit.ac.in' && password === 'password') {
    return {
    token: 'mock_jwt_token_xyz',
    user: {
        id: '1',
        name: 'Smit Potkar',
        email,
    },
    isOnboardingComplete: true,
    };
  }
  throw new Error('Invalid credentials');
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const {
        token,
        user,
        isOnboardingComplete,
      } = await mockLoginApi(data.email, data.password);

      await setAuth({
        token,
        user,
        isOnboardingComplete,
      });

      router.replace(
        isOnboardingComplete
          ? '/(tabs)/dashboard'
          : '/(onboarding)'
      );
    } catch (err: any) {
      Alert.alert('Login failed', err.message ?? 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-20 pb-10">

          {/* Header */}
          <View className="mb-10">
            <View className="w-14 h-14 rounded-2xl bg-emerald-500 items-center justify-center mb-6">
              <Text className="text-2xl font-bold text-white">₹</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">Welcome back</Text>
            <Text className="text-base text-gray-500">Log in to continue your journey</Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="smit@vesit.ac.in"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />

            {/* Forgot password */}
            <Pressable
              onPress={() => router.push('/(auth)/forgot-password')}
              className="self-end"
            >
              <Text className="text-sm text-emerald-600 font-medium">Forgot password?</Text>
            </Pressable>
          </View>

          {/* Login button */}
          <View className="mt-8">
            <Button
              label="Log in"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          {/* Sign up link */}
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-base text-gray-500">Don't have an account? </Text>
            <Pressable onPress={() => router.push('/(auth)/signup')}>
              <Text className="text-base text-emerald-600 font-semibold">Sign up</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}