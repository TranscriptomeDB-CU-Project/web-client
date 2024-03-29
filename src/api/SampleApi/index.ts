/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Column } from '@/app/select/types'
import {
  GetGroupSampleIdRequestDTO,
  GetGroupSampleIdResponseDTO,
  GetGroupSamplesRequestDTO,
  GetSamplesRequestDTO,
  GetSamplesResponseDTO,
  GetTokenRequestDTO,
} from '@/dto/types'

export default class SampleApi {
  static async getToken(condition: GetTokenRequestDTO): Promise<string> {
    return 'token'
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

  static async getGroup(token: string, column: Column): Promise<GetSamplesResponseDTO> {
    const query: GetGroupSamplesRequestDTO = {
      token,
      column: column.colname,
      coltype: column.coltype,
    }

    return {
      page: 1,
      maxpage: 1,
      data: [
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '3',
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
