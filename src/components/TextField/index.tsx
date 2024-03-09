import { Icon } from '@iconify/react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import useSwitch from '@/hooks/useSwitch'
import { PALETTE } from '@/theme'

import Suggestion from '../Suggestion'
import { InputContainer, StyledInput } from './styled'
import { TextFieldProps } from './types'

const TextField = (props: TextFieldProps) => {
  const { onChange, value, placeholder, search, getSuggestions, onSelectSuggestion, isLoading } = props

  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>()
  const suggestionState = useSwitch()

  useEffect(() => {
    setQuery(value)
  }, [value])

  // Debounce
  useEffect(() => {
    if (query !== value) {
      const timeout = setTimeout(async () => {
        onChange(query)
        showSuggestion(query)
      }, 300)

      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSuggestions, onChange, query, suggestionState])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSelectSuggestions = useCallback(
    (value: string) => {
      suggestionState.setOff()
      if (onSelectSuggestion) {
        onSelectSuggestion(value)
      } else {
        onChange(value)
      }
    },
    [onChange, onSelectSuggestion, suggestionState],
  )

  const showSuggestion = useCallback(
    async (query: string) => {
      setSuggestions(await getSuggestions?.(query))
      suggestionState.setOn()
    },
    [getSuggestions, suggestionState],
  )

  return (
    <OutsideClickHandler onOutsideClick={suggestionState.setOff}>
      <InputContainer
        onClick={() => {
          showSuggestion(query)
        }}
      >
        <StyledInput placeholder={placeholder} value={query} onChange={handleChange} />
        {search && <Icon icon="mdi:magnify" fontSize={24} color={PALETTE.PRIMARY[700]} />}
        {suggestionState.state && (
          <Suggestion suggestions={suggestions} onSelect={handleSelectSuggestions} isLoading={isLoading} />
        )}
      </InputContainer>
    </OutsideClickHandler>
  )
}

export default TextField
