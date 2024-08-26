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
];
