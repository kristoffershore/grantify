import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Nav, NavContent, Content, Section } from './styles';

import Sidebar from '../../components/Sidebar';

import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Sidebar signOut={signOut} />

      <Nav>
        <NavContent>
          <h1>
            Welcome, <Link to="/profile">{user.name}</Link>
          </h1>
        </NavContent>
      </Nav>

      <Content>
        <Section>
          <strong>What`s next?</strong>

          <Link to="/dashboard">
            <Button>Manage grants</Button>
          </Link>

          <Link to="/dashboard">
            <Button>Add grant</Button>
          </Link>

          <Link to="/dashboard">
            <Button>View financials</Button>
          </Link>
        </Section>
      </Content>
    </Container>
  );
};
export default Dashboard;
