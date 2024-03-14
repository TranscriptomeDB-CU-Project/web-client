'use client'

import React from 'react'

import Button from '@/components/Button'
import Text from '@/components/Text'

import { useSearch } from '../../context/SearchContext'
import { ConditionGroup } from '../../types'
import ConditionItem from '../ConditionItem'
import { ConditionItemContainer } from './styled'

const SimpleCondition = () => {
  const actions = useSearch()

  const rootGroup = actions.getItem('root') as ConditionGroup | null

  if (!rootGroup) return null

  return (
    <>
      {rootGroup.conditions.length > 0 && (
        <ConditionItemContainer>
          <Text style={{ gridColumn: 3 }} center>
            Column
          </Text>
          <Text style={{ gridColumn: 5 }} center>
            Keyword
          </Text>
          <div />
          {rootGroup.conditions.map((conditionId, idx) => (
            <ConditionItem key={conditionId} id={conditionId} excludeOperator={idx === 0} />
          ))}
        </ConditionItemContainer>
      )}
      <Button onClick={() => actions.addItem('condition', 'root')} size="medium" style={{ alignSelf: 'flex-end' }}>
        Add Condition
      </Button>
    </>
  )
}

export default SimpleCondition
