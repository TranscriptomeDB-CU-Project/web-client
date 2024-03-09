import styled from 'styled-components'

import { PALETTE } from '@/theme'

import Text from '../Text'

export const SuggestionContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(100% + 5px);
  left: 0;
  background-color: ${PALETTE.WHITE};
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  min-width: 100%;
  overflow: hidden;
`

export const ItemContainer = styled(Text)`
  padding: 2px 10px;
  border-bottom: 1px solid ${PALETTE.BLACK[50]};
`
