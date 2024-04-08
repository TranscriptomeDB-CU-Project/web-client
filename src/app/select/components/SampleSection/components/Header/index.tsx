import { Icon } from '@iconify/react'
import React from 'react'

import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { OrderDirection } from '@/dto/types'
import { useAppDispatch, useAppSelector } from '@/store'
import selectedColActions from '@/store/selectedColumn/actions'
import { PALETTE } from '@/theme'

import { HeaderContainer, TitleContainer } from './styled'

const Header = () => {
  const { value, sortBy } = useAppSelector((state) => state.selectedColumn)
  const dispatch = useAppDispatch()

  return (
    <tr>
      <th />
      {value.map(({ column: { colname }, query }) => (
        <HeaderContainer key={colname}>
          <TitleContainer onClick={() => dispatch(selectedColActions.setSort(colname))}>
            <Text variant="h3">{colname}</Text>
            {sortBy?.column.colname === colname && (
              <Icon
                fontSize={24}
                icon={sortBy.direction === OrderDirection.ASC ? 'mdi:arrow-up' : 'mdi:arrow-down'}
                color={PALETTE.RED[500]}
              />
            )}
          </TitleContainer>
          <TextField
            value={query}
            onChange={dispatch(selectedColActions.setQuery(colname))}
            search
            inputProps={{
              style: {
                width: '100%',
              },
            }}
          />
        </HeaderContainer>
      ))}
    </tr>
  )
}

export default Header
