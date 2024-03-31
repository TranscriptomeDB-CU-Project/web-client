import Button from '@/components/Button'
import Text from '@/components/Text'

import { GroupBySelectionContainer, SelectionButtonContainer, SelectionTitleContainer } from './styled'
import { GroupBySelectionProps } from './types'

const GroupBySelection = ({ value, count, onRemove, onSelectAll }: GroupBySelectionProps) => {
  return (
    <GroupBySelectionContainer>
      <SelectionTitleContainer>
        <Text variant="body1" color="primary-950">
          {value}
        </Text>
        <Text variant="body2" color="black-400">
          {count}
        </Text>
      </SelectionTitleContainer>
      <SelectionButtonContainer>
        <Button onClick={() => onSelectAll?.(value)} color="primary" style={{ flex: 1 }}>
          Select All
        </Button>
        <Button onClick={() => onRemove?.(value)} color="red" style={{ flex: 1 }}>
          Remove All
        </Button>
      </SelectionButtonContainer>
    </GroupBySelectionContainer>
  )
}

export default GroupBySelection
