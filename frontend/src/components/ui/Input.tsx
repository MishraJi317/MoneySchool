import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { cn } from '../../utils/cn';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, leftElement, rightElement, containerClassName, className, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View className={cn('w-full', containerClassName)}>
        {label && <Text className="text-sm font-medium text-gray-900 mb-1.5">{label}</Text>}

        <View
          className={cn(
            'flex-row items-center w-full rounded-xl border bg-white px-3.5',
            error ? 'border-red-500' : isFocused ? 'border-emerald-500' : 'border-gray-300'
          )}
        >
          {leftElement && <View className="mr-2">{leftElement}</View>}

          <TextInput
            ref={ref}
            className={cn('flex-1 py-3 text-base text-gray-900', className)}
            placeholderTextColor="#9CA3AF"
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...rest}
          />

          {rightElement && <View className="ml-2">{rightElement}</View>}
        </View>

        {error ? (
          <Text className="text-sm text-red-500 mt-1">{error}</Text>
        ) : helperText ? (
          <Text className="text-sm text-gray-500 mt-1">{helperText}</Text>
        ) : null}
      </View>
    );
  }
);

Input.displayName = 'Input';