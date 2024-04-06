import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import sampleActions from '@/store/sample/actions'
import { sampleDependency } from '@/store/sample/selector'
import selectedSampleActions from '@/store/selectedSample/actions'

import ActionButtons from './components/ActionButtons'
import Header from './components/Header'
import PaginationSection from './components/PaginationSection'
import Sample from './components/Sample'
import { Container, Line, OuterTableContainer, TableContainer } from './styled'

const SampleSection = () => {
  const { data } = useAppSelector((state) => ({
    selected: state.selectedColumn.value,
    data: state.sample.value,
  }))
  const dependency = useAppSelector(sampleDependency)

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
            {data &&
              data.map((row, index) => (
                <TableContainer key={index}>
                  <Sample item={row} />
                </TableContainer>
              ))}
          </tbody>
        </table>
      </OuterTableContainer>
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
