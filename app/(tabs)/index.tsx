import MonthlyCalendar from "@/components/calendars/MonthlyCalendar";
import PlatformIncomes from "@/components/PlatformIncomes";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { recoilActivePlatforms, recoilDateString, recoilPlatformList } from '@/recoil/store';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { useRecoilValue } from "recoil";

export default function Home() {
  const [thisYear, thisMonth] = useRecoilValue(recoilDateString);
  const userPlatforms = useRecoilValue(recoilPlatformList);
  /* 
  [
    {"isActive": true, "platformId": "1", "platformName": "배달의 민족"}, 
    {"isActive": true, "platformId": "2", "platformName": "쿠팡 이츠"}, 
    {"isActive": true, "platformId": "3", "platformName": "요기요"}, 
    {"isActive": true, "platformId": "4", "platformName": "일반 대행"}
  ]
  */
  const activePlatforms = useRecoilValue(recoilActivePlatforms);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const gradientColors = isDarkMode
    ? ['#111314', '#151718']  // 다크모드
    : ['#f2f2f2', '#ffffff']; // 라이트모드

  const shadowColor = isDarkMode
    ? '#ECEDEE'
    : '#11181C';

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.viewMonth}>{`${thisYear}년 ${thisMonth}월`}</ThemedText>
        <ThemedView style={styles.monthlyIncomeContainer}>
          <ThemedText>목표 월급</ThemedText>
          <ThemedText style={styles.monthlyIncome}>2,000,000 원</ThemedText>
        </ThemedView>
      </ThemedView>
      {/* 인컴 */}
      <ThemedView style={{ ...styles.shadow, shadowColor }}>
        <LinearGradient
          colors={gradientColors}
          style={styles.totalIncome}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <ThemedText style={styles.totalText}>0원</ThemedText>
          <ThemedText style={styles.totalText}>0건</ThemedText>
        </LinearGradient>
      </ThemedView>
      {/** 
       * 스크롤 가능한 뷰
       * 이 영역 안에 있는 항목만 스크롤 가능, 위 아래 영역은 Fixed 요소로 동작함
       * 탭과 헤더 부분을 침범하지 않고 동작
       */}
      <ScrollView>
        <ThemedView style={styles.platformIncome}>
          {/* 플랫폼별 이번달 수행 건수 / 수익 */}
          <PlatformIncomes userPlatforms={activePlatforms} />
          <ThemedView>
            <ThemedText>
              - 1022원 (4.4%)
            </ThemedText>
            <ThemedText>
              40000원 {/* 상세한 명세를 볼 수 있는 버튼 추가 */}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/**
          * @TODO 달력에 데이터 뿌려주고 보여줄 방법 찾기
          */}
        <MonthlyCalendar />

        {/**
          * @TODO 수익을 그래프로 만들어줄 라이브러리 찾기, 없으면 만들어야함. LOL
          */}
        <ThemedView>
          <ThemedText>수익 그래프</ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flex: 1,
    marginTop: 60,
    padding: 10,
    alignItems: "center",
  },
  header: {
    marginVertical: 10,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewMonth: {
    fontSize: 24,
    fontWeight: '800'
  },
  monthlyIncomeContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  monthlyIncome: {
    fontSize: 20,
    fontWeight: '700'
  },
  shadow: {
    width: '100%',
    borderRadius: 8,
    marginVertical: 10,
    shadowOffset: { width: 10, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  totalIncome: {
    borderRadius: 8,
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    width: '100%',
    justifyContent: 'flex-end',
  },
  totalText: {
    paddingVertical: 5,
    fontWeight: '700',
    fontSize: 20,
  },
  platformIncome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }
});
