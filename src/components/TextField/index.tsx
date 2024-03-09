import { Icon } from '@iconify/react'
import { ChangeEvent } from 'react'

import { PALETTE } from '@/theme'

import { InputContainer, StyledInput } from './styled'
import { TextFieldProps } from './types'

const TextField = (props: TextFieldProps) => {
  const { onChange, value, placeholder, search } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <InputContainer>
      <StyledInput placeholder={placeholder} value={value} onChange={handleChange} />
      {search && <Icon icon="mdi:magnify" fontSize={24} color={PALETTE.PRIMARY[700]} />}
    </InputContainer>
  )
}

export default TextField
