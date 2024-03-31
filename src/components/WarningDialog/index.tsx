import { Icon } from '@iconify/react'

import Dialog from '@/components/Dialog'
import Text from '@/components/Text'

import { ActionButton, ActionButtonContainer, HeaderContainer, TitleContainer, WarningDialogContainer } from './styled'
import { WarningDialogProps } from './types'

const WarningDialog = ({ handleSubmit, ...dialogProps }: WarningDialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <WarningDialogContainer>
        <HeaderContainer>
          <TitleContainer>
            <Icon icon="ph:warning-fill" width="24px" height="24px" color="FBB25D" />
            <Text variant="h3">This action might takes long time</Text>
          </TitleContainer>
          <Text color="black-400" variant="body1">
            Do you want to continue?
          </Text>
        </HeaderContainer>
        <ActionButtonContainer>
          <ActionButton color="red" onClick={dialogProps.onClose}>
            Cancel
          </ActionButton>
          <ActionButton color="primary" onClick={handleSubmit}>
            Continue
          </ActionButton>
        </ActionButtonContainer>
      </WarningDialogContainer>
    </Dialog>
  )
}

export default WarningDialog
