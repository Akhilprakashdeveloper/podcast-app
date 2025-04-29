import { useCallback, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { HEIGHT, WIDTH } from "@/constants/dimensions";
import { colors } from "@/theme";
import { useStores } from "@/models";
import PodcastRenderItem from "./PodcastRenderItem";
import { Podcast } from "@/types/types";
import { observer } from "mobx-react-lite";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const CLOSE_THRESHOLD = 30;
const SHEET_HEIGHT = HEIGHT * 0.75;

const SelectedPodcastsBottomSheet = observer(({ visible, onClose }: BottomSheetProps) => {
  const { selectedPodcastsStore } = useStores();
  const selectedPodcasts = selectedPodcastsStore.selectedPodcasts;
  const podcastCount = selectedPodcastsStore.selectedCount;

  const translateY = useSharedValue(HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const openSheet = () => {
    isAnimating.value = true;
    translateY.value = withSpring(HEIGHT - SHEET_HEIGHT, {
      damping: 40,
      stiffness: 250,
      mass: 2,
    });
    backdropOpacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    }, () => {
      isAnimating.value = false;
    });
  };

  const closeSheet = () => {
    isAnimating.value = true;
    translateY.value = withTiming(HEIGHT, {
      duration: 500,
      easing: Easing.in(Easing.ease),
    });
    backdropOpacity.value = withTiming(0, {
      duration: 400,
    }, () => {
      isAnimating.value = false;
      runOnJS(onClose)();
    });
  };

  useEffect(() => {
    if (visible) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [visible]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY > 0) {
        translateY.value = ctx.startY + event.translationY;
      }
    },
    onEnd: (event) => {
      if (event.translationY > CLOSE_THRESHOLD) {
        translateY.value = withTiming(HEIGHT, {
          duration: 500,
          easing: Easing.in(Easing.ease),
        });
        backdropOpacity.value = withTiming(0, {
          duration: 400,
        }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(HEIGHT - SHEET_HEIGHT, {
          damping: 40,
          stiffness: 250,
          mass: 2,
        });
      }
    },
  });

  const handleRemove = useCallback(
    (item: Podcast) => {
      selectedPodcastsStore.removeSelected(item);
    },
    [selectedPodcastsStore]
  );

  if (!visible && !isAnimating.value) return null;

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <TouchableWithoutFeedback onPress={closeSheet}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.sheetContainer, sheetStyle]}>
            <View style={styles.dragHandle} />
            <View style={styles.titleContainer}>
              {podcastCount > 0 && <Text style={styles.header}>Selected Podcasts</Text>}
            </View>
            
            <ScrollView 
            showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: HEIGHT * 0.35 }}
              scrollEventThrottle={16}
              bounces={false}
            >
              {selectedPodcasts.length > 0 ? (
                selectedPodcasts.map((item) => (
                  <PodcastRenderItem
                    key={item.id}
                    item={item}
                    remove={true}
                    isSelected={selectedPodcasts.some((selectedItem) => selectedItem.id === item.id)}
                    onToggleSelect={handleRemove}
                  />
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Podcast Selection Not Available</Text>
                </View>
              )}
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transparent,
  },
  dragHandle: {
    alignSelf: 'center',
    backgroundColor: colors.darkGrey,
    borderRadius: 2.5,
    height: HEIGHT*0.005,
    marginBottom: HEIGHT*0.025,
    width: WIDTH*0.1,
  },
  emptyContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT * 0.3,
    justifyContent: 'center',
    width: WIDTH * 0.9,
  },
  emptyText: {
    color: colors.darkGrey,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center'
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sheetContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    height: HEIGHT * 0.85,
    left: 0,
    paddingHorizontal: WIDTH * 0.05,
    paddingTop: HEIGHT * 0.02,
    position: "absolute",
    right: 0,
  },
  titleContainer: {
    height: HEIGHT * 0.1,
    justifyContent: "center"
  },
});

export default SelectedPodcastsBottomSheet;