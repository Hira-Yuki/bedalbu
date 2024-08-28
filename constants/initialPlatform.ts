import { ImageSourcePropType } from 'react-native';

export interface platformType {
  platformId: string;
  platformName: string;
  isActive: boolean;
}

export const INITIAL_PLATFORM: platformType[] = [
  {
    platformId: '1',
    platformName: '배달의 민족',
    isActive: false,
  },
  {
    platformId: '2',
    platformName: '쿠팡 이츠',
    isActive: false,
  },
  {
    platformId: '3',
    platformName: '요기요',
    isActive: false,
  },
  {
    platformId: '4',
    platformName: '일반 대행',
    isActive: false,
  },
] as const;
/**
 * 플랫폼 로고 매핑
 * 플랫폼 ID를 키로 사용하여 로고를 가져옴
 */
export const PLATFORM_LOGOS: { [key: string]: ImageSourcePropType } = {
  '1': require('@/assets/icons/baemin-icon.webp'), // 배달의 민족
  '2': require('@/assets/icons/coupang_eat-icon.webp'), // 쿠팡 이츠
  '3': require('@/assets/icons/yogiyo-icon.webp'), // 요기요
  '4': require('@/assets/icons/scooter.webp'), // 일반 대행
} as const;
