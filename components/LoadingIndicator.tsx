import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export default function LoadingIndicator() {
  return (
    <ThemedView style={styles.loading}>
      <ActivityIndicator
        size="large"
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
})
