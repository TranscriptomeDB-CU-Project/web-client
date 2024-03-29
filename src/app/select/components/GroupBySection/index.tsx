import Select from '@/components/Select'
import Text from '@/components/Text'
import WarningDialog from '@/components/WarningDialog'

import GroupBySelection from './components/GroupBySelection'
import useGroupBy from './hooks/useGroupBy'
import { Container, GroupByListContainer } from './styled'

const GroupBySection = () => {
  const {
    availableFilter,
    groupList,
    handleConfirmGrouping,
    handleOpenModal,
    handleSelectGroup,
    modal,
    selectedGroup,
  } = useGroupBy()

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
          onChange={handleSelectGroup}
        />
      </div>
      <GroupByListContainer>
        {groupList.map(({ count, value }) => (
          <GroupBySelection
            key={`${selectedGroup}_${value}`}
            value={value}
            onSelectAll={(value) => handleOpenModal(value, 'ADD')}
            onRemove={(value) => handleOpenModal(value, 'REMOVE')}
            count={count}
          />
        ))}
      </GroupByListContainer>
      <WarningDialog isOpen={modal.state} onClose={modal.setOff} handleSubmit={handleConfirmGrouping} />
    </Container>
  )
}

export default GroupBySection
