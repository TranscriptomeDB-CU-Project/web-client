import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const Container = styled.div`
  border: 1px solid ${PALETTE.BLACK[200]};
  border-radius: 10px;
  padding: 20px;
  max-width: 250px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  max-height: calc(100dvh - 24px);
`

export const GroupByListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 16px;
`
