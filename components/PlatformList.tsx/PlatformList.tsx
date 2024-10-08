import { platformType } from '@/constants/initialPlatform';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface PlatformListPropsType {
  platforms: platformType[]; // 표시할 플랫폼 목록
  myPlatforms: platformType[]; // 사용자가 선택한 플랫폼 목록
  handlePlatformSelect: (value: platformType) => void; // 플랫폼 선택/해제 함수
  title: string; // 컴포넌트 제목
  isSelected?: boolean; // 사용자가 선택한 리스트인가?
}

export default function PlatformList({
  platforms,
  myPlatforms,
  handlePlatformSelect,
  title,
  isSelected,
}: PlatformListPropsType) {


  return (
    <ThemedView style={styles.selectContainer}>
      <ThemedText style={styles.selectTitle}>{title}</ThemedText>
      <FlatList
        data={platforms}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.platformItem,
              !isSelected && myPlatforms.includes(item) && styles.selectedPlatformItem,
            ]}
            onPress={() => handlePlatformSelect(item)}
          >
            <ThemedText style={styles.itemText}>{item.platformName}</ThemedText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.platformName}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(173, 173, 173, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'flex-start',
    gap: 10,
  },
  selectTitle: {
    fontWeight: '800',
    paddingVertical: 10,
    textAlign: 'center',
  },
  platformItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedPlatformItem: {
    opacity: 0.3,
  },
  itemText: {
    color: '#11181C',
    fontWeight: '600',
  },
});
