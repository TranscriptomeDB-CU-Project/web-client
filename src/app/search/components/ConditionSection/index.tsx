'use client'

import React from 'react'

import Switch from '@/components/Switch'
import Text from '@/components/Text'

import { useSearch } from '../../context/SearchContext'
import { ConditionGroup } from '../../types'
import ConditionGroupItem from '../ConditionGroupItem'
import SimpleCondition from '../SimpleCondition'
import { Container, TitleContainer } from './styled'

const ConditionSection = () => {
  const { complex, getItem } = useSearch()

  const rootGroup = getItem('root') as ConditionGroup | null

  if (!rootGroup) return null

  return (
    <Container>
      <TitleContainer>
        <Text variant="h2" style={{ flexGrow: 1 }}>
          Condition
        </Text>

        <Text variant="h3">Complex</Text>
        <Switch checked={complex.state} onChange={complex.toggle} />
      </TitleContainer>
      {complex.state ? <ConditionGroupItem id="root" /> : <SimpleCondition />}
    </Container>
  )
}

export default ConditionSection
