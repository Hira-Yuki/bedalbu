import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

const initialPlatform = ["배달의 민족", "쿠팡 이츠", "요기요", "일반 대행"];

export default function Initialize() {
  // 사용자가 선택한 플랫폼 목록을 상태로 관리
  const [myPlatforms, setMyPlatforms] = useState<string[]>([]);

  // 사용자가 플랫폼을 선택하거나 선택 해제할 때 호출
  const handlePlatformSelect = (platform: string) => {
    if (!myPlatforms.includes(platform)) {
      // 플랫폼이 선택되지 않은 경우: 내 플랫폼 목록에 추가
      setMyPlatforms([...myPlatforms, platform]);
    } else {
      // 이미 선택된 플랫폼인 경우: 내 플랫폼 목록에서 제거
      setMyPlatforms(myPlatforms.filter(item => item !== platform));
    }
  };

  // 완료 버튼을 눌렀을 때 호출
  const handleComplete = () => {
    console.log("설정이 완료되었습니다:", myPlatforms);

    // myPlatforms 리스트를 initialPlatform의 순서에 맞게 정렬
    const sortedPlatforms = [...myPlatforms].sort(
      (a, b) => initialPlatform.indexOf(a) - initialPlatform.indexOf(b)
    );

    console.log("sorted platforms:", sortedPlatforms);
    // 여기서 sortedPlatforms를 필요에 따라 저장하거나 처리할 수 있음
    setMyPlatforms(sortedPlatforms);
  };

  return (
    <ThemedView style={styles.container} >
      {/* 헤더 영역 */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>내 배달 플랫폼 설정</ThemedText>
        <ThemedText>이용하는 배달 플랫폼을 선택하세요.</ThemedText>
        <ThemedText style={styles.subText}>(추후에도 수정 가능합니다.)</ThemedText>
      </ThemedView>

      {/* 플랫폼 선택 및 내 플랫폼 리스트 표시 영역 */}
      <ThemedView style={styles.selectArea}>
        {/* 사용 가능한 플랫폼 리스트 */}
        <ThemedView style={styles.selectContainer}>
          <ThemedText style={styles.selectTitle}>플랫폼 선택</ThemedText>
          <FlatList
            data={initialPlatform} // 초기 플랫폼 목록을 데이터로 사용
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.platformItem,
                  myPlatforms.includes(item) && styles.selectedPlatformItem
                ]}
                onPress={() => handlePlatformSelect(item)} // 아이템 클릭 시 플랫폼 선택 함수 호출
              >
                <ThemedText style={styles.itemText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
            keyExtractor={item => item} // 각 항목의 키로 플랫폼 이름 사용
          />
        </ThemedView>

        {/* 사용자가 선택한 플랫폼 리스트 */}
        <ThemedView style={styles.selectContainer}>
          <ThemedText style={styles.selectTitle}>내 플랫폼</ThemedText>
          <FlatList
            data={myPlatforms} // 사용자가 선택한 플랫폼 목록을 데이터로 사용
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.platformItem}
                onPress={() => handlePlatformSelect(item)} // 아이템 클릭 시 플랫폼 선택 해제 함수 호출
              >
                <ThemedText style={styles.itemText} >{item}</ThemedText>
              </TouchableOpacity>
            )}
            keyExtractor={item => item} // 각 항목의 키로 플랫폼 이름 사용
          />
        </ThemedView>
      </ThemedView>

      {/* 완료 버튼 영역 */}
      <ThemedView style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <ThemedText style={styles.buttonText}>완료</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    marginTop: 140,
  },
  title: {
    padding: 10,
    fontSize: 32,
    fontWeight: '800',
  },
  subText: {
    opacity: 0.6,
  },
  selectArea: {
    flex: 3,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  selectTitle: {
    color: '#eeeeee',
    fontWeight: '800',
    paddingVertical: 10,
    textAlign: 'center'
  },
  selectContainer: {
    borderRadius: 10,
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'flex-start',
    gap: 10,
  },
  platformItem: {
    padding: 10,
    backgroundColor: 'rgba(99, 99, 99, 0.8)',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    color: '#eeeeee',
    fontWeight: '600'
  },
  selectedPlatformItem: {
    opacity: 0.3,
  },
  buttonArea: {
    flex: 2,
  },
  button: {
    backgroundColor: '#3cb371',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
