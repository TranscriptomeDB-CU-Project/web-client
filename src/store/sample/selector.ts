import { RootState } from '..'

export const sampleDependency = (state: RootState) => [
  state.sample.limit,
  state.sample.page,
  state.token.sampleToken,
  state.selectedColumn.sortBy,
  state.selectedColumn.value
    .map((v) => `${v.column.colname}-${v.query}`)
    .sort()
    .join(','),
]

export const sampleGroupDependency = (state: RootState) => [
  state.sampleGroup.column,
  state.token.sampleToken,
  state.selectedColumn.value
    .map((v) => v.query)
    .filter((v) => v !== '')
    .sort()
    .join(','),
]
