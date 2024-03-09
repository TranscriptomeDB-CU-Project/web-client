export interface SuggestionProps {
  suggestions?: string[]
  isLoading?: boolean
  onSelect: (value: string) => void
}
