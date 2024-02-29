'use client'

import Button from '@/components/Button'
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
      <Button>Accept</Button>
      <Button color="RED">Accept</Button>
      <Button color="BLUE" size="medium">
        Accept
      </Button>
      <Button filled size="large">
        Accept
      </Button>
    </div>
  )
}

export default Test
