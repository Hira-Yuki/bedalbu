import { INITIAL_PLATFORM } from '@/constants/initialPlatform';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const STORAGE_KEY = '@my_platforms';

export default function useUserPlatform() {
  const [myPlatforms, setMyPlatforms] = useState<string[]>([]);

  const sortingSelectedList = (array: string[]) => {
    return [...array].sort(
      (a, b) => INITIAL_PLATFORM.indexOf(a) - INITIAL_PLATFORM.indexOf(b),
    );
  };

  // 사용자가 플랫폼을 선택하거나 선택 해제할 때 호출
  const handlePlatformSelect = (platform: string) => {
    if (!myPlatforms.includes(platform)) {
      // 플랫폼이 선택되지 않은 경우: 내 플랫폼 목록에 추가
      setMyPlatforms(sortingSelectedList([...myPlatforms, platform]));
    } else {
      // 이미 선택된 플랫폼인 경우: 내 플랫폼 목록에서 제거
      setMyPlatforms(
        sortingSelectedList(myPlatforms.filter(item => item !== platform)),
      );
    }
  };

  // 완료 버튼을 눌렀을 때 호출
  const handleComplete = async () => {
    // 선택된 플랫폼을 AsyncStorage에 저장
    try {
      console.log('AsyncStorage 호출');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myPlatforms));
    } catch (error) {
      console.error('Failed to save sorted platforms:', error);
    }
  };

  return { myPlatforms, handlePlatformSelect, handleComplete };
}
