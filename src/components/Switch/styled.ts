import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const SwitchContainer = styled.input.attrs({ type: 'checkbox' })`
  width: 45px;
  height: 25px;
  position: relative;
  appearance: none;
  margin: 0;

  &:before {
    content: ' ';
    position: absolute;
    width: 45px;
    height: 25px;
    background-color: ${PALETTE.BLACK[300]};
    border-radius: 15px;
    transition: background-color 0.1s;
  }

  &:checked:before {
    background-color: ${PALETTE.PRIMARY[600]};
  }

  &:after {
    content: ' ';
    position: absolute;
    top: 50%;
    transform: translateY(-51%);
    left: 3px;
    width: 20px;
    height: 20px;
    background-color: ${PALETTE.WHITE};
    border-radius: 50%;
    transition: left 0.3s;
  }

  &:checked:after {
    left: calc(100% - 20px - 3px);
  }
`
