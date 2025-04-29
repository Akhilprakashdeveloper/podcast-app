import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { HEIGHT, WIDTH } from "@/constants/dimensions";
import { colors } from "@/theme";
import { observer } from "mobx-react-lite";
import { Pressable } from "react-native";
import { useStores } from "@/models";

interface FloatingButtonProps {
  onClickShowPodCast: () => void;
  isVisible: boolean;
}

const FloatingButton = observer(({ onClickShowPodCast, isVisible }: FloatingButtonProps) => {
  const { selectedPodcastsStore } = useStores();
  const podcastCount = selectedPodcastsStore.selectedCount;

  // Animation values
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      scale.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      translateY.value = withTiming(100, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      opacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      scale.value = withTiming(0.9, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
    backgroundColor: podcastCount > 0 ? colors.selected : colors.textGrey,
  }));

  return (
    <Pressable onPress={onClickShowPodCast}>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <Text style={styles.buttonText}>Show Added ({podcastCount})</Text>
      </Animated.View>
    </Pressable>
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
    shadowColor: 'rgba(185, 190, 177, 0.9)',
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