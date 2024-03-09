export interface UseDebounceParams {
  debounceValue: string
  originalValue?: string
  onChange: (value: string) => void
  time?: number
}
