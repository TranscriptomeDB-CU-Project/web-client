import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from '@hello-pangea/dnd'
import { useCallback, useState } from 'react'

import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { useAppDispatch, useAppSelector } from '@/store'
import columnActions from '@/store/column/actions'
import selectedColActions from '@/store/selectedColumn/actions'

import ColumnCard from './components/ColumnCard'
import { Container } from './styled'

const ColumnSection = () => {
  const [textInput, setTextInput] = useState('')

  const dispatch = useAppDispatch()
  const { isFetching, selectedCol } = useAppSelector((state) => ({
    isFetching: state.column.isFetching,
    selectedCol: state.selectedColumn.value,
  }))

  const getSuggestion = useCallback((query: string) => dispatch(columnActions.getSuggestion(query)), [dispatch])

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return
    dispatch(selectedColActions.rearrange(result.source.index, result.destination.index))
  }

  return (
    <Container>
      <div>
        <Text variant="h2" color="primary-950" style={{ textAlign: 'center', minWidth: 'max-content' }}>
          Column
        </Text>
        <TextField
          placeholder="Search column"
          getSuggestions={getSuggestion}
          onSelectSuggestion={(value) => {
            dispatch(selectedColActions.add(value))
            setTextInput('')
          }}
          value={textInput}
          onChange={setTextInput}
          isLoading={isFetching}
        />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
              {...provided.droppableProps}
            >
              {selectedCol.map(({ column: { colname } }, index) => (
                <Draggable key={colname} draggableId={colname} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      key={colname}
                    >
                      <ColumnCard name={colname} count={1} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}

export default ColumnSection
