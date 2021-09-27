import React from 'react';

import { Link } from 'react-router-dom';
import { FiClipboard, FiDollarSign, FiHome, FiPower } from 'react-icons/fi';
import { Container, SidebarContent } from './styles';

import logoImg from '../../assets/logo-up-dashboard.svg';

interface AuthProps {
  signOut(): void;
}

const Sidebar: React.FC<AuthProps> = ({ signOut }) => {
  return (
    <Container>
      <SidebarContent>
        <section>
          <Link to="/">
            <img src={logoImg} alt="Grantify" />
          </Link>
        </section>

        <div>
          <Link to="/dashboard">
            <FiHome />
          </Link>

          <Link to="/dashboard">
            <FiClipboard />
          </Link>

          <Link to="/dashboard">
            <FiDollarSign />
          </Link>
        </div>

        <section>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </section>
      </SidebarContent>
    </Container>
  );
};

export default Sidebar;
