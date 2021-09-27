import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #8257e5;
  width: 96px;
  height: 100%;
  position: absolute;
`;

export const SidebarContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 33vh;
  justify-content: center;

  section:first-of-type {
    padding-top: 40px;
  }

  div {
    display: flex;
    flex-direction: column;

    a {
      background: transparent;
      border: 0;

      + a {
        margin-top: 20px;
      }

      &:hover {
        color: ${shade(0.2, '#312e38')};
      }

      svg {
        color: #fff;
        width: 20px;
        height: 20px;
      }
    }
  }

  button:last-child {
    background: transparent;
    border: 0;

    svg {
      color: #fff;
      width: 20px;
      height: 20px;
    }
  }
`;
