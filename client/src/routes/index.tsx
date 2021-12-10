import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import GrantView from '../pages/GrantView';
import GrantList from '../pages/GrantList';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import UserTable from '../pages/UserTable';
import PermissionBoard from '../pages/PermissionBoard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/home" component={Home} isPrivate />
      <Route path="/grants" exact component={GrantList} isPrivate />
      <Route path="/grants/:id" component={GrantView} isPrivate />
      <Route path="/users" exact component={UserTable} isPrivate />
      <Route path="/users/:id/edit" component={PermissionBoard} isPrivate />
      {/* <Route path="/dashboard/grants/new" component={GrantForm} isPrivate /> */}
      {/* <Route
        path="/dashboard/grants/:id/edit"
        component={GrantForm}
        isPrivate
      /> */}
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
