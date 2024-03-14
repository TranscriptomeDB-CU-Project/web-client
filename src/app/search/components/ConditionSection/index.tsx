'use client'

import React from 'react'

import Button from '@/components/Button'

import { useSearch } from '../../context/SearchContext'
import { ConditionGroup } from '../../types'
import ConditionItem from '../ConditionItem'
import { ConditionItemContainer } from './styled'

const ConditionSection = () => {
  const actions = useSearch()

  const rootGroup = actions.getItem('root') as ConditionGroup | null

  if (!rootGroup) return null

  return (
    <div>
      <ConditionItemContainer>
        {rootGroup.conditions.map((conditionId, idx) => (
          <ConditionItem key={conditionId} id={conditionId} excludeOperator={idx === 0} />
        ))}
      </ConditionItemContainer>
      <Button onClick={() => actions.addItem('condition', 'root')} size="medium">
        Add Condition
      </Button>
    </div>
  )
}

export default ConditionSection
