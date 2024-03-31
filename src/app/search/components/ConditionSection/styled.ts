import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 24px;

  border: 1px solid ${PALETTE.BLACK[200]};
  border-radius: 10px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
