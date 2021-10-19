import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 8rem 5rem;
  width: 100%;
  height: 560px;
  border-radius: 10px;
  text-align: center;
  align-items: center;

  h3 {
    color: #4080ea;
    font-size: 2rem;
    line-height: 3rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    opacity: 0.7;
    margin-bottom: 10px;
  }
`;
