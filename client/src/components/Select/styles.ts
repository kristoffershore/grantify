import styled from 'styled-components';

export const SelectBlock = styled.div`
  position: relative;

  + div {
    margin-top: 1.4rem;
  }

  label {
    font-size: 0.9rem;
  }

  select {
    width: 100%;
    height: 2.6rem;
    margin-top: 0.8rem;
    border-radius: 10px;
    background: #f8f8fc;
    border: 1px solid #e6e6f0;
    outline: 0;
    padding: 0 1.6rem;

    option {
      font-size: 16px;
      font-family: 'Barlow', serif;
      color: #312e38;
    }
  }

  &:focus-within::after {
    width: (100% - 3.2rem);
    height: 2px;
    content: '';
    background: #916bea;
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0px;
  }
`;
