import React from 'react';
import { View, ScrollView, ScrollViewProps, StatusBar } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { cn } from '../../utils/cn';

export interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  className?: string;
  edges?: Edge[];
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  statusBarStyle?: 'light-content' | 'dark-content';
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  className,
  edges = ['top', 'bottom'],
  contentContainerStyle,
  statusBarStyle = 'dark-content',
}: ScreenProps) {
  const Content = scroll ? ScrollView : View;
  const contentProps = scroll
    ? { contentContainerStyle: [{ flexGrow: 1 }, contentContainerStyle], keyboardShouldPersistTaps: 'handled' as const }
    : { style: { flex: 1 } };

  return (
    <SafeAreaView edges={edges} className={cn('flex-1 bg-slate-50', className)}>
      <StatusBar barStyle={statusBarStyle} />
      <Content className={cn(padded && 'px-4', 'flex-1')} {...(contentProps as any)}>
        {children}
      </Content>
    </SafeAreaView>
  );
}