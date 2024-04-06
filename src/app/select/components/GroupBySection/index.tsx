import { useEffect } from 'react'

import Select from '@/components/Select'
import Text from '@/components/Text'
import { useAppDispatch, useAppSelector } from '@/store'
import { sampleGroupDependency } from '@/store/sample/selector'
import sampleGroupActions from '@/store/sampleGroup/actions'
import { selectedColSelectors } from '@/store/selectedColumn'
import selectedSampleActions from '@/store/selectedSample/actions'

import GroupBySelection from './components/GroupBySelection'
import { Container, GroupByListContainer } from './styled'

const GroupBySection = () => {
  const availableFilter = useAppSelector(selectedColSelectors.getSelectable)
  const { groupList, column } = useAppSelector((state) => ({
    groupList: state.sampleGroup.value,
    column: state.sampleGroup.column,
  }))
  const dispatch = useAppDispatch()
  const dependency = useAppSelector(sampleGroupDependency)

  useEffect(() => {
    dispatch(sampleGroupActions.fetch())
  }, [dependency, dispatch])

  useEffect(() => {
    return () => {
      dispatch(sampleGroupActions.reset())
    }
  }, [dispatch])

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
          value={column?.colname ?? ''}
          onChange={(value: string) => dispatch(sampleGroupActions.setColumn(value))}
        />
      </div>
      <GroupByListContainer>
        {groupList?.map(({ count, value }) => (
          <GroupBySelection
            key={`${column}_${value}`}
            value={value}
            onSelectAll={(value) => dispatch(selectedSampleActions.byGroupVal(column, value, true))}
            onRemove={(value) => dispatch(selectedSampleActions.byGroupVal(column, value, false))}
            count={count}
          />
        ))}
      </GroupByListContainer>
    </Container>
  )
}

export default GroupBySection
