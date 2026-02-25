/**
 * Vibe level configuration — colors, icons, and messages.
 */
import type { VibeLevel } from './api';

export interface VibeConfig {
  level: VibeLevel;
  label: string;
  message: string;
  emoji: string;
  gradient: [string, string];
  textColor: string;
}

export const VIBE_CONFIGS: Record<VibeLevel, VibeConfig> = {
  green: {
    level: 'green',
    label: "You're Chillin",
    message: "You're chillin, go for it.",
    emoji: '\u{1F436}',
    gradient: ['#10b981', '#059669'],
    textColor: '#ffffff',
  },
  yellow: {
    level: 'yellow',
    label: 'Watch Out',
    message: 'Ehhh you got bills coming up tho.',
    emoji: '\u{1F436}',
    gradient: ['#f59e0b', '#d97706'],
    textColor: '#ffffff',
  },
  red: {
    level: 'red',
    label: "Don't Do It",
    message: "Dog. Don't do it.",
    emoji: '\u{1F6D1}',
    gradient: ['#ef4444', '#dc2626'],
    textColor: '#ffffff',
  },
};

/**
 * Placeholder vibe calculation based on spending amount.
 * Will be replaced by real decision engine.
 */
export function getPlaceholderVibe(
  spentThisWeek: number,
  balance: number
): VibeLevel {
  const ratio = spentThisWeek / balance;
  if (ratio > 0.4) return 'red';
  if (ratio > 0.2) return 'yellow';
  return 'green';
}
