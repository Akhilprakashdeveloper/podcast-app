import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SelectedPodcastsStoreModel } from "./SelectedPodcastsStore"

export const RootStoreModel = types.model("RootStore", {
  selectedPodcastsStore: types.optional(SelectedPodcastsStoreModel, {}), // 👈 Add to RootStore
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
