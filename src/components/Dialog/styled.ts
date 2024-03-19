import styled from 'styled-components'

export const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100%;
  height: 100%;
`

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

export const ContentContainer = styled.div`
  z-index: 100;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`
