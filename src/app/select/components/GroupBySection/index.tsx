import { useCallback, useMemo, useState } from 'react'

import Select from '@/components/Select'
import Text from '@/components/Text'

import GroupBySelection from './components/GroupBySelection'
import { MOCK_GROUP_BY_OPTIONS } from './constants'
import { Container, GroupByListContainer } from './styled'

const GroupBySection = () => {
  const [selected, setSelected] = useState<string[]>([])

  const handleAddSelect = useCallback((value: string) => {
    setSelected((prev) => {
      if (prev.includes(value) || !value) return prev
      return [...prev, value]
    })
  }, [])

  const handleRemoveSelect = useCallback((value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value))
  }, [])

  const availableFilter = useMemo(
    () => MOCK_GROUP_BY_OPTIONS.filter((option) => !selected.includes(option.value)),
    [selected],
  )

  return (
    <Container>
      <div>
        <Text variant="h2" color="primary-950" style={{ textAlign: 'center', minWidth: 'max-content' }}>
          Group By
        </Text>
        <Select
          items={[
            {
              label: 'Select',
              value: '',
            },
            ...availableFilter,
          ]}
          value=""
          onChange={handleAddSelect}
        />
      </div>
      <GroupByListContainer>
        {selected.map((value) => (
          <GroupBySelection key={value} value={value} count={0} onRemove={handleRemoveSelect} />
        ))}
      </GroupByListContainer>
    </Container>
  )
}

export default GroupBySection
