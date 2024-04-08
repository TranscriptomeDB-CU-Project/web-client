import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const Container = styled.div`
  border: 1px solid ${PALETTE.BLACK[200]};
  border-radius: 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  min-width: 0;
  overflow: auto;
  box-sizing: border-box;
  max-height: calc(100dvh - 24px);
`

export const FallBackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35vh;
`

export const Line = styled.div`
  height: 1px;
  background-color: ${PALETTE.BLACK[200]};
`

export const TableContainer = styled.tr`
  border: 1px solid ${PALETTE.BLACK[50]};
`

export const OuterTableContainer = styled.div`
  flex-grow: 1;
  min-width: 0;
  overflow: auto;
`
