'use client'

import { useState } from 'react'

import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import Toggle from '@/components/Toggle'

const Test = () => {
  const [toggle, setToggle] = useState('First Value')
  const onToggle = () => {
    setToggle((prev) => (prev === 'First Value' ? 'Second Value' : 'First Value'))
  }

  const [page, setPage] = useState(1)

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Button>Accept</Button>
        <Button color="red">Accept</Button>
        <Button color="blue" size="medium">
          Accept
        </Button>
        <Button filled size="large">
          Accept
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Toggle value={toggle} onToggle={onToggle} />
        <Toggle value={toggle} onToggle={onToggle} color={toggle == 'First Value' ? 'red' : 'green'} />
      </div>

      <Pagination page={page} maxPage={5} onChange={setPage} />
    </div>
  )
}

export default Test
