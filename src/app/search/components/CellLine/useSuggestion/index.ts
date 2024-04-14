import { useState } from 'react'

import CellLineApi from '@/api/CellLineApi'
import { useSearch } from '@/app/search/context/SearchContext'

const useSuggestion = () => {
  const { cellLine } = useSearch()
  const [query, setQuery] = useState('')
  const [isLoading, setLoading] = useState(false)

  const getSuggestions = async (query: string) => {
    if (query === '') return []

    setLoading(true)
    const res = await CellLineApi.getSuggestion(query)
    const result = res['cell-line-list']
      .map((cellLine) => {
        return cellLine['name-list'][0].value
      })
      .filter((_cellLine) => {
        return !cellLine.data.includes(_cellLine)
      })

    setLoading(false)

    return result
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
    isLoading,
  }
}

export default useSuggestion
