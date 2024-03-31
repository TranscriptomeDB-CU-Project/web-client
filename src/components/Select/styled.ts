import styled from 'styled-components'

import Text from '../Text'

export const SelectContainer = styled(Text).attrs<{ disabled?: boolean }>(({ disabled }) => ({
  bg: disabled ? 'black-50' : 'primary-50',
  color: disabled ? 'black-200' : 'primary-950',
}))`
  position: relative;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  gap: 7px;
`
