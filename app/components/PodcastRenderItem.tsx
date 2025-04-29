import { memo, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import FastImage from "react-native-fast-image";

import { HEIGHT, WIDTH } from "@/constants/dimensions";
import { colors } from "@/theme";
import { PodcastItemProps } from "@/types/types";

const PodcastItem = ({ item, isSelected, onToggleSelect, remove }: PodcastItemProps) => {
  const { title, channel, imageUrl } = item;
  
  const animatedHeight = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (remove) {
      Animated.timing(animatedHeight, {
        toValue: 0, 
        duration: 500, 
        useNativeDriver: true,
      }).start(() => {
        onToggleSelect(item); 
      });
    } else {
      onToggleSelect(item);
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scaleY: animatedHeight }] }]}>
      <FastImage
        style={styles.image}
        source={{
          uri: imageUrl,
          cache: FastImage.cacheControl.immutable //caching image
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.channel}>{channel}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          remove
            ? styles.removeButtonStyle
            : isSelected
            ? styles.selectedButton
            : styles.defaultButton,
        ]}
        onPress={handlePress}
      >
        <Text style={isSelected ? styles.selectedButtonText : styles.unSelectedButtonText}>
          {remove ? "Remove" : isSelected ? "Selected" : "Subscribe"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: WIDTH * 0.05,
    paddingHorizontal: WIDTH * 0.045,
    paddingVertical: HEIGHT * 0.014,
  },
  channel: {
    color: colors.textGrey,
    fontSize: 14,
    marginTop: HEIGHT * 0.007,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: HEIGHT * 0.015,
  },
  defaultButton: {
    backgroundColor: colors.grey,
  },
  image: {
    borderRadius: 10,
    height: HEIGHT * 0.08,
    width: WIDTH * 0.18,
  },
  removeButtonStyle: {
    backgroundColor: colors.lighterRed,
  },
  selectedButton: {
    backgroundColor: colors.selected,
  },
  selectedButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: WIDTH * 0.04,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  unSelectedButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default memo(PodcastItem);
