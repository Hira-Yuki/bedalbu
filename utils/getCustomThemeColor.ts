import { useThemeColor } from '@/hooks/useThemeColor';

export interface themeOptions {
  lightColor?: string;
  darkColor?: string;
}

export default function getCustomThemeColor(themeColors: {
  light?: string;
  dark?: string;
}) {
  // Recode components color
  const color = useThemeColor(themeColors, 'text');
  const buttonBackgroundColor = useThemeColor(
    themeColors,
    'buttonBackgroundColor',
  );
  const buttonTextColor = useThemeColor(themeColors, 'buttonTextColor');

  // Calendar components color
  const calendarBackgroundColor = useThemeColor(
    themeColors,
    'calendarBackgroundColor',
  );
  const calendarButtonBackgroundColor = useThemeColor(
    themeColors,
    'background',
  );

  return {
    color,
    buttonBackgroundColor,
    buttonTextColor,
    calendarBackgroundColor,
    calendarButtonBackgroundColor,
  };
}
