import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import useModalOpen from "@/hooks/useModalOpen";
import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";

const recordSectionTitle = ['날짜', '거리', '시간', '날씨', '메모'];

export default function Recode({ lightColor,
  darkColor }: {
    lightColor?: string;
    darkColor?: string;
  }) {
  const themeColors = { light: lightColor, dark: darkColor };

  const color = useThemeColor(themeColors, 'text');
  const buttonBackgroundColor = useThemeColor(themeColors, 'buttonBackgroundColor');
  const buttonTextColor = useThemeColor(themeColors, 'buttonTextColor');

  const [isOpen, toggle] = useModalOpen(false)
  const [date, setDate] = useState(new Date())
  const todayDateString = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식의 문자열

  return (
    <ThemedView style={styles.container}>
      <DatePicker
        modal
        open={isOpen}
        date={date}
        locale={'ko'}
        mode={"date"}
        maximumDate={new Date(todayDateString)}
        confirmText={"추가하기"}
        cancelText={"취소하기"}
        onConfirm={(date) => {
          toggle()
          setDate(date)
        }}
        onCancel={() => {
          toggle()
        }}
      />
      <ThemedView style={styles.header}>
        {/* 제목 */}
        <ThemedView style={styles.headerTitle}>
          <Ionicons name="create" size={24} color={color} />
          <ThemedText style={styles.headerText}>
            일별 기록
          </ThemedText>
        </ThemedView>
        {/* 날짜 추가 버튼 */}
        <TouchableOpacity style={{ ...styles.button, backgroundColor: buttonBackgroundColor }}
          onPress={() => toggle()}
        >
          <ThemedText style={{ ...styles.buttonText, color: buttonTextColor }}>
            + 날짜 추가
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      {/* 기록 섹션 */}
      <ThemedView style={styles.recordSection}>
        {recordSectionTitle.map((title) => (
          <ThemedText key={title}>
            {title}
          </ThemedText>
        ))}
      </ThemedView>
      {/* 기록 섹션 내용 */}
      <ThemedView>

      </ThemedView>
    </ThemedView>
  )
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
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  recordSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  }
})