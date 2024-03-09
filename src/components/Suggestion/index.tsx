import { MouseEvent } from 'react'

import { ItemContainer, SuggestionContainer } from './styled'
import { SuggestionProps } from './types'

const Suggestion = ({ suggestions, isLoading, onSelect }: SuggestionProps) => {
  if (!suggestions || (suggestions.length === 0 && !isLoading)) return null

  return (
    <SuggestionContainer>
      {suggestions?.map((suggestion, index) => (
        <ItemContainer
          style={{ cursor: 'pointer' }}
          key={index}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            onSelect(suggestion)
          }}
        >
          {suggestion}
        </ItemContainer>
      ))}

      {isLoading && <ItemContainer color="black-100">Loading ...</ItemContainer>}
    </SuggestionContainer>
  )
}

export default Suggestion
