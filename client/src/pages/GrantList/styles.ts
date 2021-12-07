import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  main {
    margin: 3.2rem auto;
    width: 90%;
  }

  a {
    text-decoration: none;
  }
  @media (min-width: 700px) {
    max-width: 100%;

    main {
      padding: 3.2rem 0;
      max-width: 740px;
      margin: 0 auto;
    }
  }
`;

export const Form = styled.form`
  margin-top: 3.2rem;

  label {
    color: #d4c2ff;
  }

  a {
    text-decoration: none;
  }

  button {
    width: 50%;
    height: 2.6rem;
    background: #04d361;
    color: #ffffff;
    border: 0;
    border-radius: 0.8rem;
    cursor: pointer;
    font: 700 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.2s;
    margin-top: 2rem;
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 16px;
    position: absolute;
    bottom: -28px;

    input + input {
      margin-top: 0;
    }

    select + select {
      margin-top: 0;
    }
  }
`;
