import React from 'react';

import { Container, Content, Section } from './styles';

import { useAuth } from '../../hooks/auth';
import Navbar from '../../components/Navbar';

const GrantView: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Navbar signOut={signOut} />

      <Content>
        <Section>
          <h1>Grant view</h1>
        </Section>
      </Content>
    </Container>
  );
};
export default GrantView;
