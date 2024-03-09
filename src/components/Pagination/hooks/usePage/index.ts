import { useMemo } from 'react'

const usePage = (value: number, maxValue: number) => {
  const getPages = (value: number, maxValue: number) => {
    const page: number[] = []

    page.push(1)

    if (value > 3) page.push(-1)

    if (value > 2) page.push(value - 1)

    if (value > 1 && value < maxValue) page.push(value)

    if (value < maxValue - 1) page.push(value + 1)

    if (value < maxValue - 2) page.push(-1)

    if (maxValue > 1) page.push(maxValue)

    return page
  }

  const pages = useMemo(() => getPages(value, maxValue), [value, maxValue])

  return pages
}

export default usePage
