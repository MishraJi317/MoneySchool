import { useEffect, useState } from 'react';
import { Alert, AlertButton, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/layout/Screen';
import { ProfileCard } from '@/features/settings/components/ProfileCard';
import { LogoutButton } from '@/features/settings/components/LogoutButton';
import { SettingsItem } from '@/features/settings/components/SettingsItem';
import { SettingsSection } from '@/features/settings/components/SettingsSection';
import {
  APP_VERSION,
  FUTURE_SELF_TONE_OPTIONS,
  LANGUAGE_OPTIONS,
  RESPONSE_LENGTH_OPTIONS,
} from '@/features/settings/constants';
import { useSettingsStore } from '@/features/settings/store/settings.store';
import { useAuthStore } from '@/store/auth.store';

export default function SettingsScreen() {
  const [loggingOut, setLoggingOut] = useState(false);

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const {
    language,
    notificationsEnabled,
    voiceOutputEnabled,
    voiceInputEnabled,
    responseLength,
    futureSelfTone,
    loadSettings,
    toggleNotifications,
    toggleVoiceOutput,
    toggleVoiceInput,
    setLanguage,
    setResponseLength,
    setFutureSelfTone,
  } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const name = user?.name || 'Smit Potkar';
  const email = user?.email || 'smit@email.com';
  const category = 'Student';

  const openPlaceholder = (title: string) => {
    Alert.alert(title, 'This screen will be available soon.');
  };

  const chooseLanguage = () => {
    const buttons: AlertButton[] = [
      ...LANGUAGE_OPTIONS.map((option) => ({
        text: option,
        onPress: () => {
          void setLanguage(option);
        },
      })),
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ];

    Alert.alert(
      'Language',
      'Choose your preferred language.',
      buttons
    );
  };

  const chooseResponseLength = () => {
    const buttons: AlertButton[] = [
      ...RESPONSE_LENGTH_OPTIONS.map((option) => ({
        text: option,
        onPress: () => {
          void setResponseLength(option);
        },
      })),
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ];

    Alert.alert(
      'AI Response Length',
      'Choose how detailed Future You should be.',
      buttons
    );
  };

  const chooseFutureSelfTone = () => {
    const buttons: AlertButton[] = [
      ...FUTURE_SELF_TONE_OPTIONS.map((option) => ({
        text: option,
        onPress: () => {
          void setFutureSelfTone(option);
        },
      })),
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ];

    Alert.alert(
      'Future Self Personality',
      'Choose how your future mentor communicates.',
      buttons
    );
  };

  const clearChatHistory = () => {
    Alert.alert(
      'Clear chat history?',
      'This will remove your Ask AI conversation history from this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Chat cleared', 'Your chat history has been cleared.');
          },
        },
      ]
    );
  };

  const confirmLogout = () => {
    Alert.alert('Log out?', 'You will need to sign in again to continue.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          setLoggingOut(true);
          await clearAuth();
          setLoggingOut(false);
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <Screen
      scroll
      edges={['top']}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="pb-6 pt-4">
        <Text className="text-3xl font-bold text-gray-900">Settings</Text>

        <Text className="mt-2 text-base leading-6 text-gray-500">
          Manage your profile and personalize your financial journey.
        </Text>
      </View>

      <ProfileCard
        name={name}
        email={email}
        category={category}
        onEditProfile={() => openPlaceholder('Edit Profile')}
      />

      <SettingsSection title="Preferences">
        <SettingsItem
          icon="🌐"
          title="Language"
          value={language}
          showChevron
          onPress={chooseLanguage}
        />

        <SettingsItem
          icon="🔔"
          title="Notifications"
          subtitle="Learning reminders and important updates"
          switchValue={notificationsEnabled}
          onSwitchChange={toggleNotifications}
        />

        <SettingsItem
          icon="🔊"
          title="Voice Output"
          subtitle="Let Future You read answers aloud"
          switchValue={voiceOutputEnabled}
          onSwitchChange={toggleVoiceOutput}
        />

        <SettingsItem
          icon="🎤"
          title="Voice Input"
          subtitle="Ask questions using your voice"
          switchValue={voiceInputEnabled}
          onSwitchChange={toggleVoiceInput}
        />
      </SettingsSection>

      <SettingsSection title="AI Settings">
        <SettingsItem
          icon="🤖"
          title="Future Self Personality"
          subtitle="Choose how your future mentor communicates."
          value={futureSelfTone}
          showChevron
          onPress={chooseFutureSelfTone}
        />

        <SettingsItem
          icon="📝"
          title="AI Response Length"
          value={responseLength}
          showChevron
          onPress={chooseResponseLength}
        />

        <SettingsItem
          icon="🗑"
          title="Clear Chat History"
          subtitle="Remove your Ask AI messages from this device"
          destructive
          showChevron
          onPress={clearChatHistory}
        />
      </SettingsSection>

      <SettingsSection title="Security">
        <SettingsItem
          icon="🔒"
          title="Change Password"
          showChevron
          onPress={() => openPlaceholder('Change Password')}
        />

        <SettingsItem
          icon="🔐"
          title="Biometric Login"
          subtitle="Coming soon"
          disabled
          switchValue={false}
        />

        <SettingsItem
          icon="🚪"
          title="Logout"
          destructive
          showChevron
          onPress={confirmLogout}
        />
      </SettingsSection>

      <SettingsSection title="About">
        <SettingsItem
          icon="📄"
          title="Privacy Policy"
          showChevron
          onPress={() => openPlaceholder('Privacy Policy')}
        />

        <SettingsItem
          icon="📜"
          title="Terms & Conditions"
          showChevron
          onPress={() => openPlaceholder('Terms & Conditions')}
        />

        <SettingsItem
          icon="ℹ️"
          title="App Version"
          value={APP_VERSION}
        />
      </SettingsSection>

      <SettingsSection title="Support">
        <SettingsItem
          icon="❓"
          title="Help Center"
          showChevron
          onPress={() => openPlaceholder('Help Center')}
        />

        <SettingsItem
          icon="✉️"
          title="Contact Us"
          showChevron
          onPress={() => openPlaceholder('Contact Us')}
        />

        <SettingsItem
          icon="🐞"
          title="Report Bug"
          showChevron
          onPress={() => openPlaceholder('Report Bug')}
        />
      </SettingsSection>

      <LogoutButton
        loading={loggingOut}
        onPress={confirmLogout}
      />
    </Screen>
  );
}