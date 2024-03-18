import { IUseColumn } from './hooks/useColumn/types'
import { IUseSample } from './hooks/useSample/types'

export interface ISampleContext {
  column: IUseColumn
  sample: IUseSample
}
