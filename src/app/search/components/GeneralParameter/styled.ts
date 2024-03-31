import styled from 'styled-components'

import Text from '@/components/Text'
import { PALETTE } from '@/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 24px;

  border: 1px solid ${PALETTE.BLACK[200]};
  border-radius: 10px;
`

export const ItemContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`
export const ChoiceContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`

export const TextFlex = styled(Text)`
  display: flex;
  gap: 8px;
  align-items: center;
`
