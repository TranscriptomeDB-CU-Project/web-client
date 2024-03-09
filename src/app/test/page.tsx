'use client'

import { useState } from 'react'

import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import Select from '@/components/Select'
import TextField from '@/components/TextField'
import Toggle from '@/components/Toggle'

const Test = () => {
  const [toggle, setToggle] = useState('First Value')
  const onToggle = () => {
    setToggle((prev) => (prev === 'First Value' ? 'Second Value' : 'First Value'))
  }

  const [page, setPage] = useState(1)
  const [text, setText] = useState('')

  const getSuggestions = async (query: string) => {
    if (!query) return []
    const suggestion = ['hello', 'world', 'this', 'is', 'a', 'test']
    return suggestion.filter((s) => s.includes(query))
  }

  const [values, setValues] = useState<string[]>([])
  const [choice, setChoice] = useState<number>(1)

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
      <Select
        value={choice}
        items={[
          { value: 1, label: 'First Value' },
          { value: 2, label: 'Second Value' },
        ]}
        onChange={setChoice}
      />
      <TextField placeholder="with suggestion" value={text} onChange={setText} getSuggestions={getSuggestions} />
      <TextField placeholder="no suggestion" value={text} onChange={setText} search />
      <TextField
        placeholder="with loading & add on select"
        value={text}
        onChange={setText}
        getSuggestions={getSuggestions}
        onSelectSuggestion={(value) => {
          setText('')
          setValues((prev) => [...prev, value])
        }}
        isLoading
      />
      <div>
        {values.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
    </div>
  )
}

export default Test
