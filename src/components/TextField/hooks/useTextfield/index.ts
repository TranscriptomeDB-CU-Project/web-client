import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import useDebounce from '@/hooks/useDebounce'

import { UseTextfieldParams } from './types'

const useTextfield = ({ value, onChange, showSuggestion }: UseTextfieldParams) => {
  const [query, setQuery] = useState(value)

  useEffect(() => {
    setQuery(value)
  }, [value])

  const onDebouncedChange = useCallback(
    (value: string) => {
      onChange(value)
      showSuggestion(value)
    },
    [onChange, showSuggestion],
  )

  useDebounce({ debounceValue: query, originalValue: value, onChange: onDebouncedChange })

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  return {
    query,
    handleChange,
  }
}

export default useTextfield
