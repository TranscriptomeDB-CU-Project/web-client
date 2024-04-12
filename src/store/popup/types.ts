export interface LoadingStore {
  queue: Popup[]
}

export interface Popup {
  onAccept?: () => void
}
