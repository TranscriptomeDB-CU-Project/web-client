import { Icon } from '@iconify/react'
import React from 'react'

import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { PALETTE } from '@/theme'

import { useSearch } from '../../context/SearchContext'
import { CellLineItem, Container } from './styled'
import useSuggestion from './useSuggestion'

const CellLine = () => {
  const { cellLine } = useSearch()
  const state = useSuggestion()

  return (
    <Container>
      <Text variant="h2">Cell Line</Text>
      <TextField {...state} search />
      <div>
        {cellLine.data.map((item) => (
          <CellLineItem key={item}>
            <Text variant="body1" style={{ flexGrow: 1 }}>
              {item}
            </Text>
            <Icon
              icon="mdi:close"
              color={PALETTE.PRIMARY[950]}
              fontSize={24}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => cellLine.remove(item)}
            />
          </CellLineItem>
        ))}
      </div>
    </Container>
  )
}

export default CellLine
