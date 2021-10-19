import styled, { css } from 'styled-components';

interface UserButtonProps {
  isOpen: boolean;
}

export const Nav = styled.header`
  padding: 32px 0;
  border-bottom: 1px solid #dce2e6;
`;

export const NavContent = styled.div`
  max-width: 1220px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr;
  column-gap: 30px;
  align-items: center;

  section:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: center;

    h1 {
      color: #404254;
      font-weight: 500;
    }

    img {
      margin-right: 10px;
    }
  }

  div:first-of-type {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20%;
  }

  a {
    color: #acb1c6;
    text-decoration: none;

    &:hover {
      color: #404254;
    }
  }

  img {
    width: 50px;
    height: 50px;
    padding: 10px;
    border: 1px solid #e1eafd;
    border-radius: 50%;
    background-color: #e1eafd;
  }

  svg {
    color: #acb1c6;
    width: 20px;
    height: 20px;
  }

  button:not(:last-of-type) {
    background: transparent;
    border: 0;
  }

  section {
    display: flex;
    flex-direction: row;

    &:last-of-type {
      justify-content: space-evenly;
      align-items: center;

      button:first-of-type {
        height: 20px;
        width: 20px;

        &:hover svg {
          color: #404254;
        }
      }
    }
  }
`;

export const UserButton = styled.button<UserButtonProps>`
  padding: 10px;
  border: 1px solid #e1eafd;
  border-radius: 50%;
  background-color: #e1eafd;
  transition: 300ms;

  svg {
    color: #4080ea;
  }

  ${props =>
    props.isOpen &&
    css`
      background-color: #4080ea;

      svg {
        color: #fff;
      }
    `}

  &:hover {
    background-color: #4080ea;

    svg {
      color: #fff;
    }
  }
`;

export const DropdownMenu = styled.article`
  position: absolute;
  top: 95px;
  transform: translateX(-15%);
  width: 150px;
  height: 150px;
  background-color: #e1eafd;
  border: 1px solid #e1eafd;
  border-radius: 6%;
  padding: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  button {
    color: #404254;

    &:hover {
      color: #acb1c6;
    }

    a {
      color: #404254;

      &:hover {
        color: #acb1c6;
      }
    }

    &:last-of-type {
      display: none;
    }
  }
`;
