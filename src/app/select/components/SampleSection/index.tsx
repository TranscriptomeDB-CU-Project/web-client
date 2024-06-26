import React, { useEffect, useState } from 'react'

import Text from '@/components/Text'
import { useAppDispatch, useAppSelector } from '@/store'
import sampleActions from '@/store/sample/actions'
import sampleSelectors from '@/store/sample/selector'
import { selectedColSelectors } from '@/store/selectedColumn'
import selectedSampleActions from '@/store/selectedSample/actions'

import ActionButtons from './components/ActionButtons'
import Header from './components/Header'
import PaginationSection from './components/PaginationSection'
import Sample from './components/Sample'
import { Container, FallBackContainer, Line, OuterTableContainer, TableContainer } from './styled'

const SampleSection = () => {
  const { data, showNoColumn, showNoSample, showSample } = useAppSelector((state) => ({
    data: state.sample.value,
    showNoColumn: selectedColSelectors.noSelectedColumn(state),
    showNoSample: sampleSelectors.shouldShowNoSample(state),
    showSample: sampleSelectors.shouldShowSample(state),
  }))
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const dependency = useAppSelector(sampleSelectors.sampleDependency)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(sampleActions.fetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency, dispatch])

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
          <tbody>
            {isClient &&
              showSample &&
              data.map((row, index) => (
                <TableContainer key={index}>
                  <Sample item={row} />
                </TableContainer>
              ))}
          </tbody>
        </table>
      </OuterTableContainer>
      <FallBackContainer>
        {showNoSample ? (
          <Text color="primary-700">No sample found for this query</Text>
        ) : (
          showNoColumn && <Text color="primary-700">Please select column from the left section</Text>
        )}
      </FallBackContainer>
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
