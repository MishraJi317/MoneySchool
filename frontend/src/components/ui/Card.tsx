import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../utils/cn';

type CardVariant = 'flat' | 'outlined' | 'elevated';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  padded?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  flat: 'bg-white',
  outlined: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-sm',
};

export function Card({ variant = 'outlined', padded = true, className, children, style, ...rest }: CardProps) {
  return (
    <View
      className={cn('rounded-2xl', variantStyles[variant], padded && 'p-4', className)}
      // shadow-sm in NativeWind doesn't always map cleanly to elevation on Android,
      // so elevated cards also get a small native elevation as a fallback
      style={[variant === 'elevated' ? { elevation: 2 } : null, style]}
      {...rest}
    >
      {children}
    </View>
  );
}