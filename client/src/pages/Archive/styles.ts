import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 600px;
`;

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  width: 600px;
  animation: ${appearFromBottom} 1s;
`;
