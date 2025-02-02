import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type UserType = 'creator' | 'editor' | 'viewer';

// Improved hex color generation with proper padding
function padHex(value: number): string {
  return value.toString(16).padStart(2, '0');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const getAccessType = (userType: UserType) => {
  switch (userType) {
    case 'creator':
    case 'editor':
      return ['room:write'];
    case 'viewer':
    default:
      return ['room:read', 'room:presence:write'];
  }
};

export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    case diffInDays >= 1:
      return `${Math.floor(diffInDays)} days ago`;
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return 'Just now';
  }
};

export function getRandomColor(): string {
  const avoidColors = ['#000000', '#FFFFFF', '#8B4513'];

  let randomColor;
  do {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Fixed hex color generation with proper padding
    randomColor = `#${padHex(r)}${padHex(g)}${padHex(b)}`;
  } while (avoidColors.includes(randomColor));

  return randomColor;
}

export const brightColors = [
  '#2E8B57', '#FF6EB4', '#00CDCD', '#FF00FF', '#FF007F',
  '#FFD700', '#00CED1', '#FF1493', '#00CED1', '#FF7F50',
  '#9ACD32', '#FFA500', '#32CD32', '#ADFF2F', '#DB7093',
  '#00FF7F', '#FFD700', '#FF007F', '#FF6347',
] as const;

export function getUserColor(userId: string): string {
  let sum = 0;
  for (let i = 0; i < userId.length; i++) {
    sum += userId.charCodeAt(i);
  }

  const colorIndex = sum % brightColors.length;
  return brightColors[colorIndex];
}

// New utility functions for AI integration
export const truncateText = (text: string, maxLength: number = 1000): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};