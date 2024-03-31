import { GetCellLineSuggestionResponseDTO } from '@/dto/types'
import { apiClient } from '@/utils/apiClient'

export default class CellLineApi {
  static async getSuggestion(keyword: string): Promise<GetCellLineSuggestionResponseDTO> {
    const res = await apiClient.get(`/cellline/${keyword}`)
    return res.data
  }
}
