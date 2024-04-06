import { RootState } from '..'

export const sampleDependency = (state: RootState) => [
  state.sample.limit,
  state.sample.page,
  state.token.sampleToken,
  state.selectedColumn.sortBy,
  state.selectedColumn.value,
]
