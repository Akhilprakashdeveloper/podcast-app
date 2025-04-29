export interface Podcast {
  id: string
  title: string
  channel: string
  imageUrl: string
}
export interface PodcastItemProps {
  item: Podcast
  isSelected: boolean
  onToggleSelect: (item: Podcast) => void
  remove?:boolean
}
