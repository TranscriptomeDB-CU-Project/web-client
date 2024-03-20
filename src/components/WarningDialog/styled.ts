import styled from 'styled-components'

import Button from '@/components/Button'

export const WarningDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const ActionButton = styled(Button).attrs({ size: 'medium' })`
  flex: 1;
`
