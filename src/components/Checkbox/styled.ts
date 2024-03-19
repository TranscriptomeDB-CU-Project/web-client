import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const CheckboxContainer = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  appearance: none;
  position: relative;
  margin: 0;
  cursor: pointer;

  &:checked {
    accent-color: ${PALETTE.PRIMARY[700]};
  }

  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 2px;
    border: 2px solid ${PALETTE.BLACK[100]};
  }

  &:hover:before {
    border-color: ${PALETTE.BLACK[200]};
  }

  &:checked:before {
    content: ' ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 2px;
    background-color: ${PALETTE.PRIMARY[700]};
    border-width: 0px;
  }

  &:hover:checked:before {
    background-color: ${PALETTE.PRIMARY[800]};
  }

  &:checked:after {
    content: '✓';
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${PALETTE.WHITE};
  }
`
