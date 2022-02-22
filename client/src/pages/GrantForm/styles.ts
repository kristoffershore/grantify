import { shade } from 'polished';
import styled from 'styled-components';

export const Content = styled.div`
  max-width: 1120px;
  margin: 48px auto;
  display: flex;
  justify-content: center;
`;

export const Section = styled.section`
  margin-top: 4.8rem;
  width: 800px;

  main {
    background: #ffffff;
    width: 100%;
    max-width: 800px;
    border: 1px solid #dce2e5;
    border-radius: 16px;
    margin: -3.2rem auto 3.2rem;
    padding-top: 2.4rem;
    overflow: hidden;
    fieldset {
      border: 0;
      padding: 0 2.4rem;
      + fieldset {
        margin-top: 6.4rem;
      }
      h2 {
        font-size: 14px;
        font-weight: 400;
        margin-top: 40px;
        margin-bottom: 18px;
      }
      button {
        margin-bottom: 1.2rem;
        width: 20%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #4080ea;
        padding-bottom: 10px;
      }
      legend {
        font-weight: 700;
        font-size: 1.6rem;
        color: #acb1c6;
        margin-bottom: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 1.6rem;
        border-bottom: 1px solid #6c6c70;

        button {
          background: none;
          border: 0;
          color: #4080ea;
          font-weight: 700;
          font-size: 0.8rem;
          transition: color 0.2s;

          &:hover {
            background: ${shade(0.2, '#4080ea')};
          }
        }
      }
    }

    footer {
      padding: 0 1.2rem 3.6rem 1.2rem;
      background: #fff;
      margin-top: 3.2rem;

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        line-height: 2.4rem;
        color: #fff;

        img {
          margin-right: 2rem;
        }
      }

      div {
        display: flex;
        justify-content: center;

        button {
          width: 40%;
          color: #fff;
          border: 0;
          border-radius: 0.8rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background-color 0.2s;
          margin-top: 3.2rem;
        }
      }
    }
  }
`;
