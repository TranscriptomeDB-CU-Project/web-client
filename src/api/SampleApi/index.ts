import FileDownload from 'js-file-download'

import { Column } from '@/app/select/types'
import {
  GetGroupSampleIdRequestDTO,
  GetGroupSampleIdResponseDTO,
  GetGroupSamplesRequestDTO,
  GetGroupSamplesResponseDTO,
  GetSamplesRequestDTO,
  GetSamplesResponseDTO,
  GetTokenRequestDTO,
  GetTokenResponseDTO,
} from '@/dto/types'
import { apiClient } from '@/utils/apiClient'

export default class SampleApi {
  static async getToken(condition: GetTokenRequestDTO): Promise<string> {
    const res = await apiClient.post<GetTokenResponseDTO>('/samples/filter', condition)
    return res.data.token
  }

  static async getSamples(query: GetSamplesRequestDTO): Promise<GetSamplesResponseDTO> {
    const res = await apiClient.post<GetSamplesResponseDTO>('/samples', query)
    return res.data
  }

  static async getGroup(token: string, column: Column): Promise<GetGroupSamplesResponseDTO> {
    const query: GetGroupSamplesRequestDTO = {
      token,
      column: column.colname,
      coltype: column.coltype,
    }

    const res = await apiClient.get<GetGroupSamplesResponseDTO>('/samples/group', { params: query })

    return res.data
  }

  static async getIds(token: string, columns: GetGroupSampleIdRequestDTO['select']): Promise<string[]> {
    const query: GetGroupSampleIdRequestDTO = {
      token,
      select: columns,
    }

    const res = await apiClient.post<GetGroupSampleIdResponseDTO>('samples/id', query)
    return res.data.ids
  }

  static async download(ids: string[]): Promise<void> {
    const res = await apiClient.post('/samples/download', { ids }, { responseType: 'blob' })
    FileDownload(res.data, 'samples.tsv')
  }
}
