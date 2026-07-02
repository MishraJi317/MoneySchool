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

// ─── Validation ───────────────────────────────────────────────────────────────
// Signup only needs email + password. Name, income, goals are collected
// by the onboarding agent — not here.
const signupSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof signupSchema>;

// ─── Mock signup API ──────────────────────────────────────────────────────────
// Replace with: const res = await api.post('/auth/signup', { email, password })
// Your backend should return: { token, user, onboarding_complete: false }
async function mockSignupApi(email: string) {
  await new Promise((r) => setTimeout(r, 1200));
  return {
    token: 'mock_jwt_new_user_xyz',
    user: {
      id: '2',
      name: '',        // name is empty — agent will fill this
      email,
    },
    isOnboardingComplete: false,   // always false for new users
  };
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { token, user, isOnboardingComplete } = await mockSignupApi(data.email);

      // Save token to SecureStore + Zustand
      await setAuth({ token, user, isOnboardingComplete });

      // New users always go to onboarding — agent builds the profile
      router.replace('/(onboarding)');
    } catch (err: any) {
      Alert.alert('Signup failed', err.message ?? 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const password = watch('password');
  const strength = getPasswordStrength(password);

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
        <View className="flex-1 px-6 pt-16 pb-10">

          {/* Back button */}
          <Pressable onPress={() => router.back()} className="mb-8 self-start">
            <Text className="text-base text-gray-500">← Back</Text>
          </Pressable>

          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-1">Create account</Text>
            <Text className="text-base text-gray-500">
              Just email and password — your AI guide will do the rest.
            </Text>
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
                <View>
                  <PasswordInput
                    label="Password"
                    placeholder="Min. 8 chars, 1 uppercase, 1 number"
                    autoComplete="new-password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                  />
                  {/* Strength bar — only shows when user starts typing */}
                  {password.length > 0 && (
                    <View className="flex-row gap-1 mt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <View
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i <= strength.score
                              ? strength.color
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </View>
                  )}
                  {password.length > 0 && (
                    <Text className={`text-xs mt-1 ${strength.textColor}`}>
                      {strength.label}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>

          {/* Terms note */}
          <Text className="text-xs text-gray-400 mt-4 leading-5">
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </Text>

          {/* Submit */}
          <View className="mt-6">
            <Button
              label="Create account"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          {/* Login link */}
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-base text-gray-500">Already have an account? </Text>
            <Pressable onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-base text-emerald-600 font-semibold">Log in</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Too weak', color: 'bg-red-400', textColor: 'text-red-500' },
    { label: 'Weak', color: 'bg-orange-400', textColor: 'text-orange-500' },
    { label: 'Fair', color: 'bg-amber-400', textColor: 'text-amber-600' },
    { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-600' },
    { label: 'Very strong', color: 'bg-emerald-600', textColor: 'text-emerald-700' },
  ];

  return { score, ...levels[Math.min(score, 4)] };
}