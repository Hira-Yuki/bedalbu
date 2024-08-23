import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, TouchableOpacity } from "react-native";

// const colum = [
//   ['일평균', 40000, '(4일)'],
//   ['남은 일평균', 140000, '(14일)'],
//   ['운행거리', 40000, '일평균 350', '1130원/km'],
//   ['운행시간', '40:00', '일평균 7시간', '시급 11090원'],
// ]

export default function CalendarHeader({ lightColor,
  darkColor }: {
    lightColor?: string;
    darkColor?: string;
  }) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'calendarBackgroundColor');
  const buttonBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const PressOffDay = () => {
    console.log('PressOffDay')
  }

  return (
    <ThemedView style={{ ...styles.headerContainer, backgroundColor: backgroundColor }}>
      <ThemedView style={styles.headerItem}>
        <ThemedText style={styles.contentsTitle}>
          일 평균
        </ThemedText>
        <ThemedText style={styles.contentsData}>
          40,000
        </ThemedText>
        <ThemedText style={styles.contentsSubData}>
          (4일)
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.headerItem}>
        <ThemedText style={styles.contentsTitle}>
          남은 일평균
        </ThemedText>
        <ThemedText style={styles.contentsData}>
          140,000
        </ThemedText>
        <ThemedText style={styles.contentsSubData}>
          (14일)
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.headerItem}>
        <ThemedText style={styles.contentsTitle}>
          운행거리
        </ThemedText>
        <ThemedText style={styles.contentsData}>
          4000km
        </ThemedText>
        <ThemedText style={styles.contentsSubData}>
          일 평균 350
        </ThemedText>
        <ThemedText style={styles.contentsSubData}>
          1130원/km
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.headerItem}>
        <ThemedText style={styles.contentsTitle}>
          운행시간
        </ThemedText>
        <ThemedText style={styles.contentsData}>
          40:00
        </ThemedText>
        <ThemedText style={styles.contentsSubData}>
          일 평균 7시간
        </ThemedText>
        <ThemedText style={styles.contentsSubData}>
          시급 11090원
        </ThemedText>
      </ThemedView>
      {/* 휴무일 설정 버튼 */}
      <TouchableOpacity onPress={PressOffDay}>
        <ThemedView style={{
          ...styles.offDayContainer,
          borderColor: color,
          shadowColor: color,
          backgroundColor: buttonBackgroundColor,
        }}>
          <FontAwesome5 name="calendar-check" size={15} color={color} />
          <ThemedText style={styles.offDayText}>휴무일</ThemedText>
        </ThemedView>
      </TouchableOpacity>

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
    padding: 8,
    justifyContent: 'center',
  },
  headerItem: {
    margin: 0,
    padding: 0,
    gap: 0,
    backgroundColor: 'inherit',
  },
  contentsTitle: {
    fontSize: 12,
    textAlign: 'center',
    margin: 0,
    padding: 0,
    lineHeight: 13,
  },
  contentsData: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '800',
    margin: 0,
    padding: 0,
    lineHeight: 13,
  },
  contentsSubData: {
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.8,
    margin: 0,
    padding: 0,
    lineHeight: 11,
  },
  // 휴무일 스타일
  offDayContainer: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 4.84,
    elevation: 5, // Android용 그림자
  },
  offDayText: {
    fontSize: 12,
    lineHeight: 12,
    marginTop: 5,
  }
})