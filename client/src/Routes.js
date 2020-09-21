import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, } from './layouts';

import {
  Chat as ChatView,
  NotFound as NotFoundView,
  Signin as Signin,
  Signup,
  Profile
} from './views';
import {
  Home as HomeView
} from './views/Orginizations'
const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/chat"
      />
      <RouteWithLayout
        component={ChatView}
        exact
        layout={MainLayout}
        path="/chat"
      />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/org/:id/home"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={Signin}
        exact
        layout={MinimalLayout}
        path="/signin"
      />
      <RouteWithLayout
        component={Signup}
        exact
        layout={MinimalLayout}
        path="/signup"
      />
      <RouteWithLayout
        component={Profile}
        exact
        layout={MinimalLayout}
        path="/profile"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
