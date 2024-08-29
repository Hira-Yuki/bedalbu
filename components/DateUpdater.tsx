import { recoilDateState } from '@/recoil/store';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useSetRecoilState } from 'recoil';

export default function DateUpdater() {
  const setDate = useSetRecoilState(recoilDateState);

  useEffect(() => {
    const checkAndUpdateDate = () => {
      const currentDate = new Date();
      setDate((prevDate) => {
        // 날짜가 이전 상태와 다른 경우에만 업데이트
        if (prevDate.getFullYear() !== currentDate.getFullYear() ||
          prevDate.getMonth() !== currentDate.getMonth() ||
          prevDate.getDate() !== currentDate.getDate()) {
          return currentDate;
        }
        return prevDate
      });
    };

    // 현재 시각과 자정(다음 날 00:00:00)까지 남은 시간을 계산
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 다음 날
        0, 0, 0
      );
      return midnight.getTime() - now.getTime();
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    // 자정에 한 번 업데이트하고, 매일 자정에 반복되도록 설정
    const setMidnightUpdate = () => {
      const timeUntilMidnight = calculateTimeUntilMidnight();
      timeoutId = setTimeout(() => {
        checkAndUpdateDate();
        setMidnightUpdate(); // 자정마다 반복 설정
      }, timeUntilMidnight);
    };
    setMidnightUpdate(); // 자정 업데이트 설정 초기화

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        checkAndUpdateDate(); // 앱이 활성화될 때 날짜를 확인
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      clearTimeout(timeoutId); // 타임아웃 정리
      subscription.remove(); // 이벤트 리스너 제거
    };

  }, [])

  return null // UI를 렌더링하지 않는 컴포넌트
}
