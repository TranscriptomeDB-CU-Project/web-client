import { Icon } from '@iconify/react'
import { ChangeEvent, useEffect, useState } from 'react'

import { PALETTE } from '@/theme'

import { InputContainer, StyledInput } from './styled'
import { TextFieldProps } from './types'

const TextField = (props: TextFieldProps) => {
  const { onChange, value, placeholder, search } = props

  const [query, setQuery] = useState(value)

  useEffect(() => {
    setQuery(value)
  }, [value])

  // Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(query)
    }, 300)

    return () => clearTimeout(timeout)
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <InputContainer>
      <StyledInput placeholder={placeholder} value={query} onChange={handleChange} />
      {search && <Icon icon="mdi:magnify" fontSize={24} color={PALETTE.PRIMARY[700]} />}
    </InputContainer>
  )
}

export default TextField
