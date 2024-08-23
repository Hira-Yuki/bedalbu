import { ThemedView } from "@/components/ThemedView";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarHeader from "./CalendarHeader";

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

export default function MonthlyCalendar({ lightColor,
  darkColor }: {
    lightColor?: string;
    darkColor?: string;
  }) {
  const [key, setKey] = useState(0);
  const scheme = useColorScheme();

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'calendarBackgroundColor')
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Calendar 라이브러리의 theme color가 시스템 테마 변경에 동적으로 반응하지 않음.
  // key 값이 변경되면 강제 랜더링 되는 것을 활용해서 테마 변경이 감지되면 Key를 변경해서 강제 랜더링 시켜줌
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [scheme]);

  return (
    <ThemedView style={styles.calendarContainer}>
      <Calendar
        key={key}
        theme={{
          calendarBackground: backgroundColor,
          textSectionTitleColor: color,
          dayTextColor: color,
          todayTextColor: '#00adf5',
          selectedDayTextColor: 'tomato',
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
          return (
            <CalendarHeader />
          )
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