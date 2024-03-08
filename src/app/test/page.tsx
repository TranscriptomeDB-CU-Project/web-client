'use client'

import Button from '@/components/Button'
import Toggle from '@/components/Toggle'
import { PRIMARY, TYPOGRAPHY } from '@/theme'
import { useState } from 'react'
import styled from 'styled-components'

const AcceptButton = styled.button`
  background-color: ${PRIMARY[500]};
  ${TYPOGRAPHY.body2}
`

const Test = () => {
  const [toggle, setToggle] = useState('First Value')
  const onToggle = () => {
    setToggle((prev) => (prev === 'First Value' ? 'Second Value' : 'First Value'))
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Button>Accept</Button>
        <Button color="RED">Accept</Button>
        <Button color="BLUE" size="medium">
          Accept
        </Button>
        <Button filled size="large">
          Accept
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Toggle value={toggle} onToggle={onToggle} />
        <Toggle value={toggle} onToggle={onToggle} color={toggle == 'First Value'} />
      </div>
    </div>
  )
}

export default Test
