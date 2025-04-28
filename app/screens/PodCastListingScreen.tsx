import { useState, useCallback } from "react"
import { FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native"

import PodcastRenderItem from "@/components/PodcastRenderItem"
import { Podcast } from "@/types/types"
import { HEIGHT, WIDTH } from "@/constants/dimensions"
import { colors } from "@/theme"

const dummyPodcasts: Podcast[] = new Array(120).fill(null).map((_, index) => ({
  id: `podcast-${index}`,
  title: `Podcast Title ${index + 1}`,
  channel: `Channel ${index + 1}`,
  imageUrl: "https://picsum.photos/200", // Loading from remote url
}))

export const PodcastListingScreen = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((existingId) => existingId !== id)
      } else {
        return [...prev, id]
      }
    })
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Podcast }) => (
      <PodcastRenderItem
        id={item.id}
        title={item.title}
        channel={item.channel}
        imageUrl={item.imageUrl}
        isSelected={selectedIds.includes(item.id)}
        onToggleSelect={toggleSelect}
      />
    ),
    [selectedIds, toggleSelect],
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Podcasts</Text>
        <Text style={styles.subtitle}>Popular on Queue</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={dummyPodcasts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WIDTH * 0.05,
    paddingTop: HEIGHT * 0.1,
  },
  flatListContainer: {
    flex: 1,
    marginTop: HEIGHT * 0.03,
  },
  safeArea: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  subtitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: HEIGHT * 0.06,
  },
  title: {
    color: colors.black,
    fontSize: 40,
    fontWeight: "bold",
  },
})

export default PodcastListingScreen
