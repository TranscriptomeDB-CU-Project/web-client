import { describe, expect, it } from 'vitest'

import { Unit } from '@/app/search/context/SearchContext/types'

import { parseAge } from '.'

describe('parseAge()', () => {
  it.each`
    value | unit          | expected
    ${1}  | ${Unit.YEAR}  | ${52}
    ${1}  | ${Unit.MONTH} | ${4}
    ${1}  | ${Unit.WEEK}  | ${1}
    ${1}  | ${Unit.DAY}   | ${0.14285714285714285}
    ${1}  | ${Unit.HOUR}  | ${0.005952380952380952}
    ${2}  | ${Unit.YEAR}  | ${104}
    ${2}  | ${Unit.MONTH} | ${8}
    ${2}  | ${Unit.WEEK}  | ${2}
    ${2}  | ${Unit.DAY}   | ${0.2857142857142857}
    ${2}  | ${Unit.HOUR}  | ${0.011904761904761904}
  `('should return $expected when value is $value and unit is $unit', ({ value, unit, expected }) => {
    expect(parseAge(value, unit)).toBe(expected)
  })
})
