import { Icon } from '@iconify/react'
import OutsideClickHandler from 'react-outside-click-handler'

import { PALETTE } from '@/theme'

import Suggestion from '../Suggestion'
import useSuggestion from './hooks/useSuggestion'
import useTextfield from './hooks/useTextfield'
import { InputContainer, StyledInput } from './styled'
import { TextFieldProps } from './types'

const TextField = (props: TextFieldProps) => {
  const { placeholder, search, isLoading, ...rest } = props

  const { state: suggestionState, showSuggestion, suggestionProps } = useSuggestion(rest)
  const { query, handleChange } = useTextfield({ ...rest, showSuggestion })

  return (
    <OutsideClickHandler onOutsideClick={suggestionState.setOff}>
      <InputContainer
        onClick={() => {
          showSuggestion(query)
        }}
      >
        <StyledInput placeholder={placeholder} value={query} onChange={handleChange} />
        {search && <Icon icon="mdi:magnify" fontSize={24} color={PALETTE.PRIMARY[700]} />}
        {suggestionState.state && <Suggestion {...suggestionProps} isLoading={isLoading} />}
      </InputContainer>
    </OutsideClickHandler>
  )
}

export default TextField
