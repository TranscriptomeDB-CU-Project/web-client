import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const Container = styled.div`
  border: 1px solid ${PALETTE.BLACK[200]};
  border-radius: 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Line = styled.div`
  height: 1px;
  background-color: ${PALETTE.BLACK[200]};
`
