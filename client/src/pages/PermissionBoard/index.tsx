import React from 'react';
import SideBar from '../../components/SideBar';
import TopNavigation from '../../components/TopNavigation';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const PermissionBoard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex">
      <SideBar signOut={signOut} />
      <div className="content-container">
        <TopNavigation />
        <div className="content-list">
          <h1 className="content-title">Permissions</h1>
        </div>
      </div>
    </div>
  );
};

export default PermissionBoard;
