import { Icon } from '@iconify/react'
import React from 'react'

import { useSample } from '@/app/select/context/SampleContext'
import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { OrderDirection } from '@/dto/types'
import { PALETTE } from '@/theme'

import { HeaderContainer, TitleContainer } from './styled'

const Header = () => {
  const {
    column: { selected, setQuery, setSort, sortBy },
  } = useSample()

  return (
    <tr>
      <th />
      {selected.map(({ name, query }) => (
        <HeaderContainer key={name}>
          <TitleContainer onClick={() => setSort(name)}>
            <Text variant="h3">{name}</Text>
            {sortBy?.columnName === name && (
              <Icon
                fontSize={24}
                icon={sortBy.direction === OrderDirection.ASC ? 'mdi:arrow-up' : 'mdi:arrow-down'}
                color={PALETTE.RED[500]}
              />
            )}
          </TitleContainer>
          <TextField
            value={query}
            onChange={setQuery(name)}
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
