import { Icon } from '@iconify/react'
import React from 'react'

import Select from '@/components/Select'
import TextField from '@/components/TextField'
import Toggle from '@/components/Toggle'
import { PALETTE } from '@/theme'
import { capitalize } from '@/utils/capitalize'

import { MATCH_TYPE_ITEMS } from '../../constants'
import useCondition from './hooks/useCondition'
import { ConditionProps } from './types'

const ConditionItem = ({ id, excludeOperator }: ConditionProps) => {
  const items = useCondition(id)
  if (!items) return null

  const { condition, toggleInclude, toggleOperator, setField, deleteCondition } = items

  const { include, operator, key, value, matchType } = condition

  return (
    <>
      {excludeOperator ? <div /> : <Toggle value={capitalize(operator)} onToggle={toggleOperator} />}
      <Toggle value={include ? 'is' : 'is not'} color={include ? 'green' : 'red'} onToggle={toggleInclude} />
      <TextField value={key} onChange={setField('key')} />
      <Select value={matchType} items={MATCH_TYPE_ITEMS} onChange={setField('matchType')} />
      <TextField value={value} onChange={setField('value')} />
      <Icon
        icon="mdi:close"
        fontSize={24}
        color={PALETTE.PRIMARY[950]}
        style={{ cursor: 'pointer' }}
        onClick={deleteCondition}
      />
    </>
  )
}

export default ConditionItem
