import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 1px solid #c0c2cd;
  color: #666360;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 8px;
  }

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
    color: #212121;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
