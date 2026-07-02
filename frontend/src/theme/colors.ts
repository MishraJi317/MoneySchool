export const colors = {
  primary: '#10B981',
  primaryLight: '#6EE7B7',
  primaryDark: '#047857',

  secondary: '#2563EB',
  secondaryLight: '#93C5FD',
  secondaryDark: '#1E40AF',

  accent: '#F59E0B',
  accentLight: '#FCD34D',
  accentDark: '#B45309',

  background: '#F8FAFC',
  surface: '#FFFFFF',

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    inverse: '#FFFFFF',
    disabled: '#9CA3AF',
  },

  border: '#E5E7EB',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#2563EB',
} as const;

export type ColorToken = typeof colors;