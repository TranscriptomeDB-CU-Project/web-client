export interface SuggestionProps {
  suggestions?: string[]
  isLoading?: boolean
  onSelect: (value: string, idx: number) => void
}
