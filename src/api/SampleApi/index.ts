/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Column } from '@/app/select/types'
import {
  GetGroupSampleIdRequestDTO,
  GetGroupSampleIdResponseDTO,
  GetGroupSamplesRequestDTO,
  GetGroupSamplesResponseDTO,
  GetSamplesRequestDTO,
  GetSamplesResponseDTO,
  GetTokenRequestDTO,
} from '@/dto/types'
import { apiClient } from '@/utils/apiClient'

export default class SampleApi {
  static async getToken(condition: GetTokenRequestDTO): Promise<string> {
    const res = await apiClient.post('/samples/filter', condition)
    return res.data
  }

  static async getSamples(query: GetSamplesRequestDTO): Promise<GetSamplesResponseDTO> {
    return {
      page: 1,
      maxpage: 1,
      data: [
        {
          id: '1',
          column1: 1,
        },
        {
          id: '2',
          column2: 2,
        },
        {
          id: '3',
          column3: 3,
        },
      ],
    }
  }

  static async getGroup(token: string, column: Column): Promise<GetGroupSamplesResponseDTO> {
    const query: GetGroupSamplesRequestDTO = {
      token,
      column: column.colname,
      coltype: column.coltype,
    }

    return {
      data: [
        {
          value: '1',
          count: 20,
        },
        {
          value: '2',
          count: 20,
        },
        {
          value: '3',
          count: 20,
        },
      ],
    }
  }

  static async getIds(token: string, columns: GetGroupSampleIdRequestDTO['select']): Promise<string[]> {
    const query: GetGroupSampleIdRequestDTO = {
      token,
      select: columns,
    }

    const res: GetGroupSampleIdResponseDTO = {
      ids: ['1', '2', '3'],
    }
    return res.ids
  }

  static async download(ids: string[]): Promise<void> {}
}
