import { Screen } from "@/components"
import { $styles, colors } from "@/theme"
import { View, Text, StyleSheet } from "react-native"

export const PodcastListingScreen = () => {
  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Podcast Listing</Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  headingText: {
    color: colors.text,
    fontSize: 24,
    textAlign: "center",
  },
})
