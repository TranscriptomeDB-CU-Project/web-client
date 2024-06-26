import { Column } from '@/app/select/types'
import {
  ColumnType,
  GetColumnsCountResponseDTO,
  GetInitialColumnResponseDTO,
  SuggestColumnRequestDTO,
  SuggestColumnResponseDTO,
} from '@/dto/types'
import { apiClient } from '@/utils/apiClient'
import { handleError } from '@/utils/error/handleError'
import { id } from '@/utils/id'

export default class ColumnApi {
  @handleError({ fallback: [] })
  static async getSuggestion(keyword: string): Promise<string[]> {
    const query: SuggestColumnRequestDTO = {
      keyword,
    }

    const res = await apiClient.get<SuggestColumnResponseDTO>('/columns', { params: query })
    return res.data.columns
  }

  @handleError({ fallback: [] })
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

  @handleError({ fallback: [] })
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

  @handleError({ fallback: [] })
  static async getInitialColumn(token: string): Promise<string[]> {
    const res = await apiClient.get<GetInitialColumnResponseDTO>('/samples/columns/initial', {
      params: {
        token,
      },
    })

    return res.data.columns
  }
}
