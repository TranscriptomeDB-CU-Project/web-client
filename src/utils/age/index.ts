import { Unit } from '@/app/search/context/SearchContext/types'

export const parseAge = (value: number, unit: Unit) => {
  switch (unit) {
    case Unit.YEAR:
      return value * 52
    case Unit.MONTH:
      return value * 4
    case Unit.WEEK:
      return value
    case Unit.DAY:
      return value / 7
    case Unit.HOUR:
      return value / 168
  }
}
