import { MatchType, Operator } from '@/app/search/types'

export interface StatusResponseDTO {
  timestamp: number
  status: {
    database: boolean
    api: boolean
    pipeline: boolean
  }
}

export interface SuggestColumnRequestDTO {
  keyword: string
  limit?: number
}

export interface SuggestColumnResponseDTO {
  columns: string[]
}

export interface GetColumnsCountRequestDTO {
  token: string
}

export interface GetColumnsCountResponseDTO {
  columns: {
    key: string
    count: number
  }[]
}

export interface GetInitialColumnResponseDTO {
  columns: string[]
}

export enum ValueType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
}

export interface ParamsWithOps {
  params: (ParamsWithOps | ParameterCondition)[]
  op: Operator
}

export interface StringColumnCondition {
  include: boolean
  matchtype: MatchType
  value: string
}

export interface NumberColumnCondition {
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export interface ParameterCondition {
  key: string
  valuetype: ValueType
  condition: StringColumnCondition | NumberColumnCondition
}

export interface GetTokenRequestDTO {
  query: ParamsWithOps | ParameterCondition
}

export interface GetTokenResponseDTO {
  token: string
}

export enum ColumnType {
  MAIN = 'MAIN',
  OTHER = 'OTHER',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface GetSamplesRequestDTO {
  select: ColumnQuery[]
  sort?: {
    key: string
    coltype: ColumnType
    order: OrderDirection
  }[]
  token: string
  limit?: number
  page?: number
}

export interface GetSamplesResponseDTO {
  page: number
  maxpage: number
  data: {
    id: string
    [key: string]: any
  }[]
}

export interface GetGroupSamplesRequestDTO {
  token: string
  column: string
  coltype: ColumnType
  select: ColumnQuery[]
}

export interface GetGroupSamplesResponseDTO {
  data: {
    value: string
    count: number
  }[]
}

export interface GetGroupSampleIdRequestDTO {
  token: string
  select: ColumnQuery[]
  exact?: ColumnQuery
}

export interface GetGroupSampleIdResponseDTO {
  ids: string[]
}

export interface DownloadFromIdsRequestDTO {
  ids: string[]
}

export type DownloadFromIdsResponseDTO = File

export interface GetCellLineSuggestionResponseDTO {
  'cell-line-list': {
    'name-list': {
      value: string
    }[]
  }[]
}

export interface Column {
  colname: string
  coltype: ColumnType
  count: number
}

export interface ColumnQuery {
  colname: string
  coltype: ColumnType
  keyword?: string
}
