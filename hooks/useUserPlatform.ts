import { INITIAL_PLATFORM, platformType } from '@/constants/initialPlatform';
import { recoilPlatformList } from '@/recoil/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useRecoilState } from 'recoil';

const STORAGE_KEY = '@my_platforms';

const sortingSelectedList = (array: platformType[]) => {
  return [...array].sort(
    (a, b) => INITIAL_PLATFORM.indexOf(a) - INITIAL_PLATFORM.indexOf(b),
  );
};

export default function useUserPlatform() {
  const [myPlatforms, setMyPlatforms] = useState<platformType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setUserPlatforms] = useRecoilState(recoilPlatformList);

  const loadPlatform = async () => {
    try {
      const userPlatform = (await AsyncStorage.getItem(STORAGE_KEY)) as string;
      if (userPlatform) {
        const json = JSON.parse(userPlatform);
        setMyPlatforms(json);
        return json;
      }
      return null;
    } catch (error) {
      console.log('Failed to load platforms: ', error);
      Alert.alert(
        '플랫폼 불러오기 에러',
        '저장된 데이터를 불러오는데 실패했습니다.',
      );
      // TODO: 사용자에게 초기화 여부 질문 후 OK 하면 초기화 후 앱 기동
      // prompt() 메서드 iOS 전용으로 확인.. 대안 필요..
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자가 플랫폼을 선택하거나 선택 해제할 때 호출
  const handlePlatformSelect = (platform: platformType) => {
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

  // 선택된 플랫폼을 AsyncStorage에 저장
  const savePlatform = async (router: () => void) => {
    if (myPlatforms.length === 0)
      return Alert.alert(
        '선택된 플랫폼 없음',
        '최소 1 개 이상의 플랫폼을 선택하세요.',
      );

    try {
      console.log('AsyncStorage 호출');
      const newPlatforms = INITIAL_PLATFORM.map(platform => ({
        ...platform,
        isActive: myPlatforms.includes(platform),
      }));
      setUserPlatforms(newPlatforms);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPlatforms));
      router();
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
