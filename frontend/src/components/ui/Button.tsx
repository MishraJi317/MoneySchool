import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const containerVariants: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-500 active:bg-emerald-600',
  secondary: 'bg-blue-600 active:bg-blue-700',
  outline: 'bg-transparent border border-gray-300 active:bg-gray-50',
  ghost: 'bg-transparent active:bg-gray-100',
  danger: 'bg-red-500 active:bg-red-600',
};

const textVariants: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-gray-900',
  ghost: 'text-gray-900',
  danger: 'text-white',
};

const sizeVariants: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-lg',
  md: 'px-4 py-3 rounded-xl',
  lg: 'px-6 py-4 rounded-2xl',
};

const textSizeVariants: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  ...rest
}: ButtonProps & { className?: string }) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(
        'flex-row items-center justify-center',
        containerVariants[variant],
        sizeVariants[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50',
        className
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#111827' : '#FFFFFF'} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            className={cn(
              'font-semibold',
              textVariants[variant],
              textSizeVariants[size],
              leftIcon ? 'ml-2' : '',
              rightIcon ? 'mr-2' : ''
            )}
          >
            {label}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </Pressable>
  );
}