import React, { forwardRef, useState } from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { Input, InputProps } from './Input';

export const PasswordInput = forwardRef<TextInput, Omit<InputProps, 'secureTextEntry' | 'rightElement'>>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        secureTextEntry={!visible}
        rightElement={
          <Pressable hitSlop={8} onPress={() => setVisible((v) => !v)}>
            <Text className="text-sm text-gray-500">{visible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';