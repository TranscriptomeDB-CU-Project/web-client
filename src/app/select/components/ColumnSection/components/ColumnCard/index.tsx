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
        <Icon style={{ marginTop: '4px', minWidth: '16px', minHeight: '16px' }} icon="mdi:hamburger-menu" />
        <Text style={{ wordBreak: 'break-all' }}>{name}</Text>
      </ContentCardContainer>
      <ContentCardContainer style={{ marginTop: '4px', height: 'fit-content', alignItems: 'center' }}>
        <Text style={{ marginTop: '-1px' }} variant="body2" color="black-400">
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
