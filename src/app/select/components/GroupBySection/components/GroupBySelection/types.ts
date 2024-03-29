export interface GroupBySelectionProps {
  value: string
  count?: number
  onRemove?: (value: string) => void
  onSelectAll?: (value: string) => void
}
