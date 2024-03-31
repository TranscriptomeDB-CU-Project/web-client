/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const res: GetColumnsCountResponseDTO = {
      columns: [
        { key: 'column1', count: 100 },
        { key: 'column2', count: 200 },
        { key: 'column3', count: 300 },
      ],
    }

    return res.columns.map((column) => {
      return {
        colname: column.key,
        coltype: ColumnType.MAIN,
        count: column.count,
      }
    })
  }

  static async getSecondaryByToken(token: string): Promise<Column[]> {
    const res: GetColumnsCountResponseDTO = {
      columns: [
        { key: 'column1', count: 100 },
        { key: 'column2', count: 200 },
        { key: 'column3', count: 300 },
      ],
    }

    await new Promise((resolve) => setTimeout(resolve, 10000))

    return res.columns.map((column) => {
      return {
        id: id(),
        colname: column.key,
        coltype: ColumnType.MAIN,
        count: column.count,
      }
    })
  }
}
