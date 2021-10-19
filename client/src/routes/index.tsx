import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import GrantView from '../pages/GrantView';
import GrantList from '../pages/GrantList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/dashboard/grants" exact component={GrantList} isPrivate />
      <Route path="/dashboard/grants/:id" component={GrantView} isPrivate />
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
