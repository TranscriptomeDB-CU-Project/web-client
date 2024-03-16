import { Icon } from '@iconify/react'
import React from 'react'

import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import { PALETTE } from '@/theme'
import { capitalize } from '@/utils/capitalize'

import { useSearch } from '../../context/SearchContext'
import { ConditionType } from '../../types'
import ConditionItem from '../ConditionItem'
import useConditionGroup from './hooks/useConditionGroup'
import { ConditionItemContainer, GroupContainer, HeaderContainer } from './styles'
import { ConditionGroupProps } from './types'

const ConditionGroupItem = ({ id }: ConditionGroupProps) => {
  const item = useConditionGroup(id)
  const actions = useSearch()

  if (!item) return null

  const { conditionGroup, toggleOperator, addCondition, addGroup, removeGroup } = item

  const { operator, conditions } = conditionGroup

  return (
    <GroupContainer>
      <HeaderContainer>
        <Toggle value={capitalize(operator)} onToggle={toggleOperator} />
        <div style={{ flexGrow: 1 }} />
        <Button onClick={addCondition}>Add Condition</Button>
        <Button onClick={addGroup}>Add Group</Button>
        {id !== 'root' && (
          <Icon
            icon="mdi:trash"
            fontSize={24}
            color={PALETTE.RED[500]}
            style={{ cursor: 'pointer' }}
            onClick={removeGroup}
          />
        )}
      </HeaderContainer>
      <ConditionItemContainer>
        {conditions.map((id) => {
          if (actions.getItem(id)?.type === ConditionType.SINGLE)
            return <ConditionItem key={id} id={id} excludeOperator />
          return <ConditionGroupItem key={id} id={id} />
        })}
      </ConditionItemContainer>
    </GroupContainer>
  )
}

export default ConditionGroupItem
