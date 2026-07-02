export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';
export { radius } from './radius';
export { shadows } from './shadows';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { shadows } from './shadows';

export const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
} as const;

export type Theme = typeof theme;