import usePage from './hooks/usePage'
import { Container, ItemContainer, StyledIcon } from './styled'
import { PaginationProps } from './types'

const Pagination = ({ page, onChange, maxPage }: PaginationProps) => {
  const pages = usePage(page, maxPage)

  return (
    <Container>
      {page > 1 && <StyledIcon icon="mdi:navigate-before" onClick={() => onChange(page - 1)} />}
      {pages.map((val, idx) => (
        <ItemContainer key={idx} $selected={page === val} $disabled={val === -1} onClick={() => onChange(val)}>
          {val === -1 ? '...' : val}
        </ItemContainer>
      ))}
      {page < maxPage && <StyledIcon icon="mdi:navigate-next" onClick={() => onChange(page + 1)} />}
    </Container>
  )
}

export default Pagination
