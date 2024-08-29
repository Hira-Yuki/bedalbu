import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import useModalOpen from "@/hooks/useModalOpen";
import useSelectableDate from "@/hooks/useSelectableDate";
import getCustomThemeColor, { themeOptions } from "@/utils/getCustomThemeColor";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";

const recordSectionTitle = ['날짜', '거리', '시간', '날씨', '메모'];

export default function Recode({ lightColor, darkColor }: themeOptions) {
  const {
    color,
    buttonBackgroundColor,
    buttonTextColor
  } = getCustomThemeColor({ light: lightColor, dark: darkColor });

  const [isOpen, toggle] = useModalOpen(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const maxSelectableDate = new Date(useSelectableDate());

  return (
    <ThemedView style={styles.container}>
      <DatePicker
        modal
        open={isOpen}
        date={selectedDate}
        locale={'ko'}
        mode={"date"}
        maximumDate={maxSelectableDate}
        confirmText={"추가하기"}
        cancelText={"취소하기"}
        onConfirm={(date) => {
          toggle()
          setSelectedDate(date)
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