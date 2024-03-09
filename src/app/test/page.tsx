'use client'

import { PRIMARY, TYPOGRAPHY } from '@/theme'
import styled from 'styled-components'

const AcceptButton = styled.button`
  background-color: ${PRIMARY[500]};
  ${TYPOGRAPHY.body2}
`

const Test = () => {
  return (
    <div>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <AcceptButton>Accept</AcceptButton>
    </div>
  )
}

export default Test
