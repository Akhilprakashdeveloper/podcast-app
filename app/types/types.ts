export interface Podcast {
  id: string
  title: string
  channel: string
  imageUrl: string
}
export interface PodcastItemProps {
  id: string
  title: string
  channel: string
  imageUrl: string
  isSelected: boolean
  onToggleSelect: (id: string) => void
}
