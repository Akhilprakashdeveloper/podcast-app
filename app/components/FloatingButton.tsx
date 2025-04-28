import { useState, useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "@/constants/dimensions"; 
import { useStores } from "@/models"; 
import { colors } from "@/theme";

const FloatingButton = () => {
  const { selectedPodcastsStore } = useStores(); // Access the store
  const podcastCount = selectedPodcastsStore.selectedCount; 

  // Animation states for opacity and translation
  const [isVisible, setIsVisible] = useState(false); // Start as hidden
  const translateY = useRef(new Animated.Value(0)).current; // For sliding animation
  const opacity = useRef(new Animated.Value(0)).current; // For fade-in/fade-out effect

  // Update visibility based on podcastCount
  useEffect(() => {
    if (podcastCount > 0) {
      setIsVisible(true); 
    } else {
      setIsVisible(false);
    }
  }, [podcastCount]);

  // Enter animation (fade in + slide up)
  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Exit animation (fade out + slide down)
      Animated.timing(translateY, {
        toValue: 100, 
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateY, opacity]);

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        {
          opacity: opacity, 
          transform: [{ translateY: translateY }],
        },
      ]}
    >
      <Text style={styles.buttonText}>Show Added ({podcastCount})</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "grey",
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
    color:colors.primary,
    fontSize: 18,
  },
});

export default FloatingButton;
