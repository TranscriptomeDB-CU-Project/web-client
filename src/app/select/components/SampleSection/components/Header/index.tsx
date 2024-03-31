import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'

import { useSample } from '@/app/select/context/SampleContext'
import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { OrderDirection } from '@/dto/types'
import { PALETTE } from '@/theme'

import { HeaderContainer, TitleContainer } from './styled'

const Header = () => {
  const {
    column: { selected, add, remove, setQuery, setSort, sortBy },
  } = useSample()

  // MOCK
  useEffect(() => {
    add('column1')
    add('column2')
    add('column3')
    return () => {
      remove('column1')
      remove('column2')
      remove('column3')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `40px repeat(${selected.length}, 1fr)` }}>
      <div />
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
    </div>
  )
}

export default Header
