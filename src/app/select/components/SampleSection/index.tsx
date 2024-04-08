import React, { useEffect } from 'react'

import Text from '@/components/Text'
import { useAppDispatch, useAppSelector } from '@/store'
import { columnSelectors } from '@/store/column'
import sampleActions from '@/store/sample/actions'
import { sampleDependency } from '@/store/sample/selector'
import selectedSampleActions from '@/store/selectedSample/actions'

import ActionButtons from './components/ActionButtons'
import Header from './components/Header'
import PaginationSection from './components/PaginationSection'
import Sample from './components/Sample'
import { Container, FallBackContainer, Line, OuterTableContainer, TableContainer } from './styled'

const SampleSection = () => {
  const { data, selectedCol, isFetching, haveCol, fetchingCol } = useAppSelector((state) => ({
    selectedCol: state.selectedColumn.value,
    data: state.sample.value,
    isFetching: state.loading.value,
    haveCol: !columnSelectors.isEmpty(state),
    fetchingCol: state.column.isFetching,
  }))
  const dependency = useAppSelector(sampleDependency)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(sampleActions.fetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency, dispatch])

  const shouldShowNoSample = !isFetching && data.length === 0
  const shouldShowNoColumn = selectedCol.length === 0 && haveCol && !fetchingCol

  useEffect(() => {
    return () => {
      dispatch(sampleActions.reset())
      dispatch(selectedSampleActions.reset())
    }
  }, [dispatch])

  return (
    <Container>
      <ActionButtons />
      <Line />
      <OuterTableContainer>
        <table cellSpacing={0} cellPadding={0} style={{ width: '100%' }}>
          <thead>
            <Header />
          </thead>
          {shouldShowNoSample ? (
            <tbody>
              <td />
              <FallBackContainer>
                <Text color="primary-700">No sample found for this query</Text>
              </FallBackContainer>
            </tbody>
          ) : shouldShowNoColumn ? (
            <FallBackContainer>
              <Text color="primary-700">Please select column from the left section</Text>
            </FallBackContainer>
          ) : (
            <tbody>
              {data &&
                data.map((row, index) => (
                  <TableContainer key={index}>
                    <Sample item={row} />
                  </TableContainer>
                ))}
            </tbody>
          )}
        </table>
      </OuterTableContainer>
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
