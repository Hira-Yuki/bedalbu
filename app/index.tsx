import LoadingIndicator from "@/components/LoadingIndicator";
import useUserPlatform from "@/hooks/useUserPlatform";
import { recoilPlatformList } from "@/recoil/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function InitialLoading() {
  const { loadPlatform } = useUserPlatform();
  const [userPlatforms, setUserPlatforms] = useRecoilState(recoilPlatformList);
  const router = useRouter();

  useEffect(() => {

    const initializePlatforms = async () => {
      const loadedPlatforms = await loadPlatform();  // 플랫폼을 로드합니다.
      setUserPlatforms(loadedPlatforms);  // 로드된 플랫폼을 상태에 설정합니다.
      loadedPlatforms.length > 0 ? router.push('/(tabs)') : router.push('/initializer')
    };
    initializePlatforms()



  }, [])

  return (
    <LoadingIndicator />
  )
}
