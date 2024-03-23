import { useState } from 'react'

import { useSearch } from '@/app/search/context/SearchContext'

const useSuggestion = () => {
  const { cellLine } = useSearch()
  const [query, setQuery] = useState('')

  // THIS FUNCTION WILL BE IMPLEMENTED IN THE LAST SPRINT
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const getSuggestions = async (query: string) => {
    return ['suggestion1', 'suggestion2', 'suggestion3']
  }

  const onSelectSuggestion = (suggestion: string) => {
    setQuery('')
    cellLine.add(suggestion)
  }

  return {
    value: query,
    onChange: setQuery,
    getSuggestions,
    onSelectSuggestion,
  }
}

export default useSuggestion
