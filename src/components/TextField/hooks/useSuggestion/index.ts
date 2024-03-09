import { useCallback, useState } from 'react'

import useSwitch from '@/hooks/useSwitch'

import { UseSuggestionParams } from './types'

const useSuggestion = ({ onSelectSuggestion, onChange, getSuggestions }: UseSuggestionParams) => {
  const [suggestions, setSuggestions] = useState<string[]>()
  const state = useSwitch()

  const handleSelectSuggestions = useCallback(
    (value: string) => {
      state.setOff()
      if (onSelectSuggestion) {
        onSelectSuggestion(value)
      } else {
        onChange(value)
      }
    },
    [onChange, onSelectSuggestion, state],
  )

  const showSuggestion = useCallback(
    async (query: string) => {
      setSuggestions(await getSuggestions?.(query))
      state.setOn()
    },
    [getSuggestions, state],
  )

  return {
    showSuggestion,
    state,
    suggestionProps: {
      suggestions,
      onSelect: handleSelectSuggestions,
    },
  }
}

export default useSuggestion
