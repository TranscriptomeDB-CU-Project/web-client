import { GetCellLineSuggestionResponseDTO } from '@/dto/types'
import { apiClient } from '@/utils/apiClient'
import { handleError } from '@/utils/error/handleError'

export default class CellLineApi {
  @handleError()
  static async getSuggestion(keyword: string): Promise<GetCellLineSuggestionResponseDTO> {
    const res = await apiClient.get<GetCellLineSuggestionResponseDTO>(`/cellline/${keyword}`)
    return res.data
  }
}
