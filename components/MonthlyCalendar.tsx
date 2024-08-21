import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { StyleSheet, useColorScheme } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'ko';

interface CalendarObjectType {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export default function MonthlyCalendar() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const backgroundColor = isDarkMode ? '#111314' : '#ECEDEE'
  // const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  return (
    <ThemedView style={styles.calendarContainer}>
      <Calendar
        theme={{
          backgroundColor: backgroundColor,
          calendarBackground: backgroundColor,
          textSectionTitleColor: textColor,
          dayTextColor: textColor,
          todayTextColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          monthTextColor: textColor,
          arrowColor: textColor,
        }}
        // 날짜 선택 시 실행될 함수
        onDayPress={(day: CalendarObjectType) => {
          console.log('selected day', day);
        }}
        disableMonthChange
        hideExtraDays
        hideArrows
        renderHeader={() => {
          /** 
           * @TODO 별도의 데이터 처리하여 보여줄 것
           * @EX 일평균, 남은 일평균, 운행거리, 운행 시간, 휴무일 설정
           */
          return null
        }}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    width: SCREEN_WIDTH * 0.9,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden'
  },
})