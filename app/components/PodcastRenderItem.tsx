import { memo } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import FastImage from "react-native-fast-image"

import { HEIGHT, WIDTH } from "@/constants/dimensions"
import { colors } from "@/theme"
import { PodcastItemProps } from "@/types/types"

const PodcastItem = ({ item, isSelected, onToggleSelect }: PodcastItemProps) => {
  const { title, channel, imageUrl } = item
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.channel}>{channel}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, isSelected ? styles.selectedButton : styles.defaultButton]}
        onPress={onToggleSelect.bind(null, item)}
      >
        <Text style={isSelected ? styles.selectedButtonText : styles.unSelectedButtonText}>
          {isSelected ? "Selected" : "Subscribe"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

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
    resizeMode: "contain",
    width: WIDTH * 0.18,
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
})

// Memoize to prevent unnecessary re-renders
export default memo(PodcastItem)
