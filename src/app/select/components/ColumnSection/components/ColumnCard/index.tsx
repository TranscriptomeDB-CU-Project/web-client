import { Icon } from '@iconify/react'

import Text from '@/components/Text'
import { useAppDispatch } from '@/store'
import selectedColActions from '@/store/selectedColumn/actions'

import { ColumnCardContainer, ContentCardContainer } from './styled'
import { ColumnCardProps } from './types'

const ColumnCard = ({ name, count }: ColumnCardProps) => {
  const dispatch = useAppDispatch()

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
        <Icon
          icon="mdi:close"
          style={{ cursor: 'pointer' }}
          onClick={() => dispatch(selectedColActions.remove(name))}
        />
      </ContentCardContainer>
    </ColumnCardContainer>
  )
}

export default ColumnCard
