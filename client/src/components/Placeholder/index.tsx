import React from 'react';
import { Container } from './styles';

interface PlaceholderProps {
  type: 'list';
}

const Placeholder: React.FC<PlaceholderProps> = ({ type }) => {
  return (
    <Container>
      {type === 'list' ? (
        <>
          <h3>No grants found...</h3>
          <p>Change the filters above or add a new grant</p>
        </>
      ) : (
        <>
          <h3>No grants found...</h3>
          <p>Check back later</p>
        </>
      )}
    </Container>
  );
};

export default Placeholder;
