import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const ConditionItemContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(65px, min-content) 1fr minmax(125px, min-content) 1fr min-content;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
`

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  border: 1px solid ${PALETTE.PRIMARY[600]};
  border-radius: 5px;
  grid-column: 1 / -1;
  min-width: min-content;
`

export const HeaderContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
