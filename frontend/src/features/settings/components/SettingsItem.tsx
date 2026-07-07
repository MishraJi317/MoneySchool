import { ReactNode } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { colors } from '@/theme';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  value?: string;
  disabled?: boolean;
  showChevron?: boolean;
  switchValue?: boolean;
  onSwitchChange?: () => void;
  onPress?: () => void;
  rightElement?: ReactNode;
  destructive?: boolean;
}

export function SettingsItem({
  icon,
  title,
  subtitle,
  value,
  disabled = false,
  showChevron = false,
  switchValue,
  onSwitchChange,
  onPress,
  rightElement,
  destructive = false,
}: SettingsItemProps) {
  const isPressable = Boolean(onPress) && !disabled;

  return (
    <Pressable
      accessibilityRole={isPressable ? 'button' : undefined}
      disabled={!isPressable}
      onPress={onPress}
      className={`min-h-14 flex-row items-center px-1 py-3 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <Text className="text-lg">{icon}</Text>
      </View>

      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${
            destructive ? 'text-red-500' : 'text-gray-900'
          }`}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text className="mt-0.5 text-sm leading-5 text-gray-500">
            {subtitle}
          </Text>
        ) : null}
      </View>

      {value ? (
        <Text className="ml-3 text-sm font-medium text-gray-500">{value}</Text>
      ) : null}

      {typeof switchValue === 'boolean' ? (
        <Switch
          value={switchValue}
          disabled={disabled}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E5E7EB', true: '#A7F3D0' }}
          thumbColor={switchValue ? colors.primary : '#FFFFFF'}
        />
      ) : null}

      {rightElement}

      {showChevron ? (
        <ChevronRight size={18} color={colors.text.disabled} />
      ) : null}
    </Pressable>
  );
}