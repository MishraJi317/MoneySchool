import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges conditional classNames and resolves Tailwind conflicts
// (e.g. cn('p-2', isLarge && 'p-4') => 'p-4')
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}