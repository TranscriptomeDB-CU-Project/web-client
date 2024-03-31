export interface IUseSelect {
  count: number
  selectByGroup: (colname: string, value: string, include: boolean) => void
  selectFiltered: (include: boolean) => void
  selectAll: (include: boolean) => void
  select: (id: string, include: boolean) => void
  isSelected: (id: string) => boolean
  download: () => void
}
