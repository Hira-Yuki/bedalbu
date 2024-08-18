import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import useDate from "@/hooks/useDate";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, useColorScheme } from "react-native";

export default function Home() {
  const { thisYear, thisMonth } = useDate()
  const userViewMonth = thisMonth + 1

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
        <ThemedText style={styles.viewMonth}>{`${thisYear}년 ${userViewMonth}월`}</ThemedText>
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

      <ThemedText>달력 위치</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flex: 1,
    marginTop: 60,
    padding: 5,
    alignItems: "center",
  },
  header: {
    marginVertical: 10,
    width: SCREEN_WIDTH * 0.9,
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
  }
});
