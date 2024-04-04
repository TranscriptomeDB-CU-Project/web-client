import { Column } from '@/app/select/types'
import { ColumnType, GetColumnsCountResponseDTO, SuggestColumnRequestDTO, SuggestColumnResponseDTO } from '@/dto/types'
import { apiClient } from '@/utils/apiClient'
import { id } from '@/utils/id'

export default class ColumnApi {
  static async getSuggestion(keyword: string): Promise<string[]> {
    const query: SuggestColumnRequestDTO = {
      keyword,
    }

    const res = await apiClient.get<SuggestColumnResponseDTO>('/columns', { params: query })
    return res.data.columns
  }

  static async getByToken(token: string): Promise<Column[]> {
    const res = await apiClient<GetColumnsCountResponseDTO>('/samples/columns/main', {
      params: {
        token,
      },
    })

    return res.data.columns.map((column) => {
      return {
        colname: column.key,
        coltype: ColumnType.MAIN,
        count: column.count,
      }
    })
  }

  static async getSecondaryByToken(token: string): Promise<Column[]> {
    const res = await apiClient<GetColumnsCountResponseDTO>('/samples/columns/other', {
      params: {
        token,
      },
    })

    return res.data.columns.map((column) => {
      return {
        id: id(),
        colname: column.key,
        coltype: ColumnType.MAIN,
        count: column.count,
      }
    })
  }
}
