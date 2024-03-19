import { ColumnType } from '@/dto/types'

export const MOCK_COLUMNS = [
  {
    colname: 'column1',
    coltype: ColumnType.MAIN,
    count: 100,
  },
  {
    colname: 'column2',
    coltype: ColumnType.MAIN,
    count: 200,
  },
  {
    colname: 'column3',
    coltype: ColumnType.MAIN,
    count: 300,
  },
]

export const MOCK_SECONDARY_COLUMNS = [
  {
    colname: 'column4',
    coltype: ColumnType.OTHER,
    count: 100,
  },
  {
    colname: 'column5',
    coltype: ColumnType.OTHER,
    count: 200,
  },
  {
    colname: 'column6',
    coltype: ColumnType.OTHER,
    count: 300,
  },
]
