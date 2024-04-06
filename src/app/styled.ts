import styled from 'styled-components'

export const DesktopContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: inherit;
    height: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
`

export const MobileContainer = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: inherit;
    height: 100%;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    box-sizing: border-box;
  }
`
