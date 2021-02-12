import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (window.localStorage.TOKEN) {
          return <Component />;
        } else {
          return <Redirect to='/auth/signin' />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
