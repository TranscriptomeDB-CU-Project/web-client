import useColumn from './hooks/useColumn'

export interface ISampleContext {
  column: ReturnType<typeof useColumn>
}
