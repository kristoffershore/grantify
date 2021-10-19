import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Box = styled.div`
  label {
    font-size: 0.9rem;
  }
`;

export const Container = styled.div<ContainerProps>`
  margin: 0.8rem 0;
  background: #f8f8fc;
  border-radius: 0.8rem;
  padding: 13px;
  width: 100%;
  border: 1px solid #e6e6f0;
  color: #312e38;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #4080ea;
      border-color: #4080ea;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #4080ea;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #312e38;

    &::placeholder {
      color: #a0acb2;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
