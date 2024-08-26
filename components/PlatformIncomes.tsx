import { platformType } from "@/constants/initialPlatform";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function PlatformIncomes({ userPlatforms }: { userPlatforms: platformType[] }) {

  return (
    <ThemedView>
      <ThemedText>
        {/* 플랫폼 이름 총 수익 총 건수 (시급) */}
        쿠팡 10000 원 24건 (1000)
      </ThemedText>
      <ThemedText>
        배민 10000 원 24건 (1000)
      </ThemedText>
      <ThemedText>
        요기요 10000 원 24건 (1000)
      </ThemedText>
      <ThemedText>
        일대 10000 원 24건 (1000)
      </ThemedText>
    </ThemedView>
  )
}
