import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from '@hello-pangea/dnd'
import { useState } from 'react'

import Text from '@/components/Text'
import TextField from '@/components/TextField'

import { useSample } from '../../context/SampleContext'
import ColumnCard from './components/ColumnCard'
import { Container } from './styled'

const ColumnSection = () => {
  const { column } = useSample()
  const [textInput, setTextInput] = useState('')

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return
    column.rearrange(column.selected[result.source.index].name, result.destination?.index)
  }

  return (
    <Container>
      <div>
        <Text variant="h2" color="primary-950" style={{ textAlign: 'center', minWidth: 'max-content' }}>
          Column
        </Text>
        <TextField
          placeholder="Search column"
          getSuggestions={column.getSuggestion}
          onSelectSuggestion={(value) => {
            column.add(value)
            setTextInput('')
          }}
          value={textInput}
          onChange={setTextInput}
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
              {column.selected.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      key={item.name}
                    >
                      <ColumnCard name={item.name} count={1} onRemove={column.remove} />
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
