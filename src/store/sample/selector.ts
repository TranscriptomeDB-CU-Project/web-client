import { RootState } from '..'
import { selectedColSelectors } from '../selectedColumn'

const sampleSelectors = {
  sampleDependency: (state: RootState) => [
    state.sample.limit,
    state.sample.page,
    state.token.sampleToken,
    state.selectedColumn.sortBy,
    state.selectedColumn.value
      .map((v) => `${v.column.colname}-${v.query}`)
      .sort()
      .join(','),
  ],

  sampleGroupDependency: (state: RootState) => [
    state.sampleGroup.column,
    state.token.sampleToken,
    state.selectedColumn.value
      .map((v) => v.query)
      .filter((v) => v !== '')
      .sort()
      .join(','),
  ],

  shouldShowSample: (state: RootState) => {
    const isEmpty = state.sample.value.length === 0
    const isNoColumn = selectedColSelectors.noSelectedColumn(state)
    const isColumnFetching = state.column.isMainColFetching

    return !isEmpty && !isNoColumn && !isColumnFetching
  },

  shouldShowNoSample: (state: RootState) => {
    const isEmpty = state.sample.value.length === 0
    const isColumnFetching = state.column.isMainColFetching

    return isEmpty && !isColumnFetching
  },
}

export default sampleSelectors
