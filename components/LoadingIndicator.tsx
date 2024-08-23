import { useThemeColor } from "@/hooks/useThemeColor";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Image, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export default function LoadingIndicator({ lightColor,
  darkColor }: {
    lightColor?: string;
    darkColor?: string;
  }) {
  const text = "데이터 배달 중 ! !";
  const animatedValues = useRef(
    Array.from({ length: text.length }, () => new Animated.Value(0))
  ).current;

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const ANIMATION_DURATION = 300; // 각 애니메이션의 지속 시간
  const ANIMATION_DELAY = 100; // 각 글자 간의 딜레이

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => (
      Animated.sequence([
        Animated.delay(index * ANIMATION_DELAY),
        Animated.timing(animatedValue, {
          toValue: -20,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ])
    ));

    const totalAnimationTime = ANIMATION_DELAY * (text.length - 1) + ANIMATION_DURATION * 2;

    const loopedAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel(animations),
        Animated.delay(totalAnimationTime - ANIMATION_DELAY * (text.length - 1))
      ])
    );

    loopedAnimation.start();
  }, [animatedValues]);


  return (
    <ThemedView style={styles.loading}>
      <ThemedView style={styles.textContainer}>
        {text.split('').map((char, index) => (
          <Animated.Text
            key={`${char}-${index}`}
            style={[{ color },
            styles.header,
            {
              transform: [
                {
                  translateY: animatedValues[index]
                },
              ],
            },
            ]}
          >
            {char}
          </Animated.Text>
        ))}
      </ThemedView>
      <ActivityIndicator
        size="large"
      />
      <Image
        style={styles.splash}
        source={require('../assets/images/splash.png')}
        resizeMode='contain'
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  textContainer: {
    flexDirection: 'row',
  },
  header: {
    // padding: 10,
    fontSize: 32,
    fontWeight: '700',
  },
  splash: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  }
})
