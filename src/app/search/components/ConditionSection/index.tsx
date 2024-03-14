'use client'

import React, { useEffect } from 'react'

import Switch from '@/components/Switch'
import Text from '@/components/Text'
import useSwitch from '@/hooks/useSwitch'

import { useSearch } from '../../context/SearchContext'
import { ConditionGroup } from '../../types'
import ConditionGroupItem from '../ConditionGroupItem'
import SimpleCondition from '../SimpleCondition'
import { Container, TitleContainer } from './styled'

const ConditionSection = () => {
  const actions = useSearch()
  const complex = useSwitch()

  useEffect(() => {
    actions.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complex.state])

  const rootGroup = actions.getItem('root') as ConditionGroup | null

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
      {complex.state ? (
        <div style={{ overflowY: 'auto' }}>
          <ConditionGroupItem id="root" />
        </div>
      ) : (
        <SimpleCondition />
      )}
    </Container>
  )
}

export default ConditionSection
