import { useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { HEIGHT, WIDTH } from "@/constants/dimensions";
import { useStores } from "@/models";
import { colors } from "@/theme";
import { observer } from "mobx-react-lite";

interface FloatingButtonProps {
  onClickShowPodCast: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FloatingButton = observer(({ onClickShowPodCast }: FloatingButtonProps) => {
  const { selectedPodcastsStore } = useStores();
  const podcastCount = selectedPodcastsStore.selectedCount;

  // Animation values
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const isVisible = useSharedValue(false);

  // Update visibility based on podcastCount
  useEffect(() => {
    if (podcastCount > 0) {
      isVisible.value = true;
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
    } else {
      isVisible.value = false;
      translateY.value = withTiming(100, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [podcastCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    backgroundColor: podcastCount > 0 ? colors.selected : colors.textGrey,
  }));

  return (
    <AnimatedPressable onPress={onClickShowPodCast}>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <Text style={styles.buttonText}>Show Added ({podcastCount})</Text>
      </Animated.View>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    borderRadius: WIDTH * 0.1,
    bottom: HEIGHT * 0.02,
    elevation: 5,
    justifyContent: "center",
    left: WIDTH * 0.05,
    marginTop: HEIGHT * 0.01,
    paddingVertical: HEIGHT * 0.025,
    position: "absolute",
    right: WIDTH * 0.05,
    shadowColor: 'rgba(242, 244, 238, 0.9)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
  },
});

export default FloatingButton;