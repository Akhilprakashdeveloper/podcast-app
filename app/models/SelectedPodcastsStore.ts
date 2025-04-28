import { Podcast } from "@/types/types"
import { runInAction } from "mobx"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

const PodcastModel = types.model("Podcast", {
  id: types.identifier,
  title: types.string,
  channel: types.string,
  imageUrl: types.string,
})

export const SelectedPodcastsStoreModel = types
  .model("SelectedPodcastsStore", {
    selectedPodcasts: types.array(PodcastModel), // Use a structured model
  })
  .actions((self) => ({
    addSelected(podcast: Podcast) {
      runInAction(() => {
        const exists = self.selectedPodcasts.find((p) => p.id === podcast.id)
        if (!exists) {
          self.selectedPodcasts.push(podcast)
        }
      })
    },
    removeSelected(podcast: Podcast) {
      runInAction(() => {
        self.selectedPodcasts.replace(self.selectedPodcasts.filter((p) => p.id !== podcast.id))
      })
    },
  }))
  .views((self) => ({
    get selectedCount() {
      return self.selectedPodcasts.length
    },
  }))

export interface SelectedPodcastsStore extends Instance<typeof SelectedPodcastsStoreModel> {}
export interface SelectedPodcastsStoreSnapshot
  extends SnapshotOut<typeof SelectedPodcastsStoreModel> {}
