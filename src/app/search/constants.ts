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
