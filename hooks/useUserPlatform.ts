import { INITIAL_PLATFORM } from '@/constants/initialPlatform';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';

const STORAGE_KEY = '@my_platforms';

export default function useUserPlatform() {
  const [myPlatforms, setMyPlatforms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const loadPlatform = async () => {
    try {
      const userPlatform = (await AsyncStorage.getItem(STORAGE_KEY)) as string;
      const json = await JSON.parse(userPlatform);
      userPlatform && setMyPlatforms(json);
    } catch (error) {
      console.log('Failed to load platforms: ', error);
      Alert.alert(
        '플랫폼 불러오기 에러',
        '시스템 저장 공간에 접근할 수 없습니다. 저장공간에 접근 권한을 확인해 주세요.',
      );
      // TODO: 사용자에게 초기화 여부 질문 후 OK 하면 초기화 후 앱 기동
    } finally {
      setIsLoading(false);
    }
  };

  // 선택된 플랫폼을 AsyncStorage에 저장
  const savePlatform = async (router: () => void) => {
    if (myPlatforms.length === 0)
      return Alert.alert(
        '선택된 플랫폼 없음',
        '최소 1 개 이상의 플랫폼을 선택하세요.',
      );

    try {
      console.log('AsyncStorage 호출');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myPlatforms));
      router();
      return true;
    } catch (error) {
      console.log('Failed to save platforms: ', error);
      return Alert.alert(
        '플랫폼 저장 에러',
        '시스템 저장 공간에 접근할 수 없습니다. 접근 권한과 저장공간이 충분한지 확인해 주세요.',
      );
    }
  };

  return {
    myPlatforms,
    handlePlatformSelect,
    savePlatform,
    loadPlatform,
    isLoading,
  };
}
