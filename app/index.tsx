import LoadingIndicator from '@/components/LoadingIndicator';
import PlatformList from '@/components/PlatformList.tsx/PlatformList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { INITIAL_PLATFORM } from "@/constants/initialPlatform";
import useUserPlatform from '@/hooks/useUserPlatform';
import { recoilPlatformList } from '@/recoil/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';


export default function Initialize() {
  const { myPlatforms, handlePlatformSelect, savePlatform, loadPlatform, isLoading } = useUserPlatform();
  const [userPlatforms, setUerPlatforms] = useRecoilState(recoilPlatformList);
  const router = useRouter();

  useEffect(() => {
    loadPlatform()
    setUerPlatforms(myPlatforms)
  }, [isLoading])

  useEffect(() => {
    userPlatforms.length > 0 && router.push('/(tabs)')
  }, [userPlatforms])

  const handleComplete = async () => {
    await savePlatform(() => router.push('/(tabs)'));
  }

  if (isLoading) {
    return (
      <LoadingIndicator />
    )
  }

  if (userPlatforms.length === 0) {
    return (
      <ThemedView style={styles.container} >

        {/* 헤더 영역 */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>내 배달 플랫폼 설정</ThemedText>
          <ThemedText>이용하는 배달 플랫폼을 선택하세요.</ThemedText>
          <ThemedText style={styles.subText}>(추후에도 수정 가능합니다.)</ThemedText>
        </ThemedView>

        {/* 플랫폼 선택 및 내 플랫폼 리스트 표시 영역 */}
        <ThemedView style={styles.selectArea}>
          {/* 사용 가능한 플랫폼 리스트 */}
          <PlatformList
            platforms={INITIAL_PLATFORM}
            myPlatforms={myPlatforms}
            handlePlatformSelect={handlePlatformSelect}
            title="플랫폼 선택"
            isSelected={false}
          />

          {/* 사용자가 선택한 플랫폼 리스트 */}
          <PlatformList
            platforms={myPlatforms}
            myPlatforms={myPlatforms}
            handlePlatformSelect={handlePlatformSelect}
            title="내 플랫폼"
            isSelected={true}
          />
        </ThemedView>

        {/* 완료 버튼 영역 */}
        <ThemedView style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleComplete}>
            <ThemedText style={styles.buttonText}>완료</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    marginTop: 140,
  },
  title: {
    padding: 10,
    fontSize: 32,
    fontWeight: '800',
  },
  subText: {
    opacity: 0.6,
  },
  selectArea: {
    flex: 3,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  buttonArea: {
    flex: 2,
  },
  button: {
    backgroundColor: '#3cb371',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
