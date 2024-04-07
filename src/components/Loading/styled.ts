import styled from 'styled-components'

export const LoadingContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 10px;
  color: white;
`
