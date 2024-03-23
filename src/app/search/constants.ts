import { Unit } from './context/SearchContext/types'
import { MatchType } from './types'

export const MATCH_TYPE_ITEMS = [
  {
    value: MatchType.CONTAINS,
    label: 'Contains',
  },
  {
    value: MatchType.MATCH,
    label: 'Match',
  },
  {
    value: MatchType.FUZZY,
    label: 'Fuzzy',
  },
]

export const UNIT_ITEMS = [
  {
    value: Unit.YEAR,
    label: 'Years',
  },
  {
    value: Unit.MONTH,
    label: 'Months',
  },
  {
    value: Unit.WEEK,
    label: 'Weeks',
  },
  {
    value: Unit.DAY,
    label: 'Days',
  },
  {
    value: Unit.HOUR,
    label: 'Hours',
  },
]
