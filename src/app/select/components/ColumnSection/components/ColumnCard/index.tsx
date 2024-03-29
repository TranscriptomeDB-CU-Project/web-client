import { Icon } from '@iconify/react'

import Text from '@/components/Text'

import { ColumnCardContainer, ContentCardContainer } from './styled'
import { ColumnCardProps } from './types'

const ColumnCard = ({ name, count, onRemove }: ColumnCardProps) => {
  return (
    <ColumnCardContainer>
      <ContentCardContainer>
        <Icon icon="mdi:hamburger-menu" />
        <Text>{name}</Text>
      </ContentCardContainer>
      <ContentCardContainer>
        <Text variant="body2" color="black-400">
          {count}
        </Text>
        <Icon icon="mdi:close" style={{ cursor: 'pointer' }} onClick={() => onRemove?.(name)} />
      </ContentCardContainer>
    </ColumnCardContainer>
  )
}

export default ColumnCard
