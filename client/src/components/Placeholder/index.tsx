import React from 'react';
import { Container } from './styles';

interface PlaceholderProps {
  type: 'menu' | 'queue';
}

const Placeholder: React.FC<PlaceholderProps> = ({ type }) => {
  return (
    <Container>
      {type === 'menu' ? (
        <>
          <h3>No drinks found...</h3>
          <p>
            Change the filters above or ask your bartender to update the menu
          </p>
        </>
      ) : (
        <>
          <h3>No orders found...</h3>
          <p>Check back later</p>
        </>
      )}
    </Container>
  );
};

export default Placeholder;
