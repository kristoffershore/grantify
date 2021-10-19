import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  + div {
    margin-top: 1.4rem;
  }

  label {
    font-size: 0.9rem;
  }

  textarea {
    width: 100%;
    height: 16rem;
    min-height: 8rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: #f8f8fc;
    border: 1px solid #c1bccc;
    outline: 0;
    resize: vertical;
    padding: 1.2rem;
    font-size: 16px;
    font-family: 'Barlow', serif;
    color: #312e38;
  }

  &:focus-within::after {
    width: (100% - 3.2rem);
    height: 2px;
    content: '';
    background: #4080ea;
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0px;
  }
`;
