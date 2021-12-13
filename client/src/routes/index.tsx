import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import GrantView from '../pages/GrantView';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PermissionBoard from '../pages/PermissionBoard';
import UserBoard from '../pages/UserBoard';
import GrantForm from '../pages/GrantForm';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/home" component={Home} isPrivate />
      <Route path="/grants" exact component={Home} isPrivate />
      <Route path="/grants/view/:id" exact component={GrantView} isPrivate />
      <Route path="/grants/add" exact component={GrantForm} isPrivate />
      <Route path="/grants/edit/:id" exact component={GrantForm} isPrivate />
      <Route path="/users" exact component={UserBoard} isPrivate />
      <Route path="/users/:id" component={PermissionBoard} isPrivate />
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
