import { IUseColumn } from './hooks/useColumn/types'
import { IUseSample } from './hooks/useSample/types'
import { IUseSelect } from './hooks/useSelect/types'

export interface ISampleContext {
  column: IUseColumn
  sample: IUseSample
  select: IUseSelect
}
