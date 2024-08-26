import { INITIAL_PLATFORM, PLATFORM_LOGOS } from "@/constants/initialPlatform";
import { Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function PlatformIncomes({ activePlatforms }: { activePlatforms: string[] }) {
  const userPlatformId = [...INITIAL_PLATFORM].reduce<string[]>((acc, platform) => {
    if (activePlatforms.includes(platform.platformId)) {
      acc.push(platform.platformId);
    }
    return acc;
  }, []);

  return (
    <ThemedView style={styles.wrapper}>
      {userPlatformId.map((id) => {
        const logo = PLATFORM_LOGOS[id];
        if (!logo) return null; // 만약 매핑된 로고가 없으면 렌더링하지 않음
        return (
          <ThemedView key={id} style={styles.container}>
            <Image source={logo} style={{ height: 16, width: 16, borderRadius: 5 }} alt="플랫폼 로고" />
            <ThemedText>10000 원 24건(1000)</ThemedText>
          </ThemedView>
        )
      })}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});