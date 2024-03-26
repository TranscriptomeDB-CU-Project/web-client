import React from 'react'

import Button from '@/components/Button'

const ActionButtons = () => {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button>Select All</Button>
      <Button color="red">Remove All</Button>
      <Button color="blue">Downlod Selected</Button>
    </div>
  )
}

export default ActionButtons
