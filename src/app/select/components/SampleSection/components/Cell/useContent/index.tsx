import React, { useCallback, useMemo } from 'react'

const useContent = (content: any) => {
  const pack = useCallback((content: any) => {
    if (Array.isArray(content)) {
      const removeEmpty = content.filter((x) => !(typeof x === 'string') || x.trim() !== '')
      return removeEmpty.length === 1 ? removeEmpty[0] : removeEmpty
    }
    return content
  }, [])

  const checkExists = useCallback((content: any) => {
    if (Array.isArray(content)) {
      return content.length > 0
    }
    if (typeof content === 'string') {
      return content.trim() !== ''
    }
    return !!content
  }, [])

  const getLink = useCallback((content: string) => {
    if (typeof content === 'string' && content.startsWith('http')) {
      return (
        <a href={content} target="_blank" rel="noreferrer">
          {content}
        </a>
      )
    }

    return content
  }, [])

  const getRange = useCallback((gte?: number, lte?: number) => {
    const lteYear = lte ? Number((lte / 52).toFixed(2)) : undefined
    const gteYear = gte ? Number((gte / 52).toFixed(2)) : undefined
    if (!lteYear) return `>= ${gteYear} years`
    if (!gteYear) return `<= ${lteYear} years`
    if (gteYear === lteYear) return `${gteYear} years`
    return `${gteYear} - ${lteYear} years`
  }, [])

  const getItem = useCallback(
    (content: any) => {
      if (Array.isArray(content)) {
        return (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {content.map((item, index) => (
              <li key={index}>{getLink(item)}</li>
            ))}
          </ul>
        )
      }
      if (typeof content === 'string') {
        return getLink(content)
      }
      if (typeof content === 'object') {
        if (content.gte || content.lte) {
          return getRange(content.gte, content.lte)
        }
        return JSON.stringify(content)
      }
      return content
    },
    [getLink, getRange],
  )

  const packedContent = useMemo(() => pack(content), [content, pack])
  const isExists = useMemo(() => checkExists(packedContent), [checkExists, packedContent])
  const formattedContent = useMemo(() => getItem(packedContent), [getItem, packedContent])

  return { isExists, formattedContent }
}

export default useContent
