import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';
import { DropdownMenu, Nav, NavContent, UserButton } from './styles';

import logoImg from '../../assets/logo-up-dashboard.svg';

interface AuthProps {
  signOut(): void;
}

const Navbar: React.FC<AuthProps> = ({ signOut }) => {
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <NavContent>
        <section>
          <img src={logoImg} alt="Grantify" />
          <h1>Grantify</h1>
        </section>

        <div>
          <Link to="/dashboard">
            <h4>Dashboard</h4>
          </Link>

          <Link to="/dashboard/grants">
            <h4>Grants</h4>
          </Link>

          <Link to="/dashboard">
            <h4>Organization</h4>
          </Link>
        </div>

        <div></div>

        <section>
          <button type="button">
            <FiSearch />
          </button>
          <UserButton
            type="button"
            onClick={() => setOpen(!open)}
            isOpen={open}
          >
            <FiUser />
          </UserButton>

          {open && (
            <DropdownMenu>
              <button type="button">
                <Link to="/profile">Profile</Link>
              </button>
              <button type="button">
                <Link to="/help">Help</Link>
              </button>
              <button type="button" onClick={signOut}>
                Log out
              </button>
              <button></button>
            </DropdownMenu>
          )}
        </section>
      </NavContent>
    </Nav>
  );
};

export default Navbar;
