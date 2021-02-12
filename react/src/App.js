import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './components/Auth';
import Join from './components/Join';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Switch>
      <ProtectedRoute exact path={['/join']} component={Join} />
      <ProtectedRoute exact path={['/', '/chat']} component={Chat} />
      <Route path='/auth' component={Auth} />
    </Switch>
  );
}

export default App;
