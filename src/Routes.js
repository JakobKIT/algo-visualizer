import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './components/HomePage';
import PathFindingPage from './containers/PathFindingPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.PATHFINDING} component={PathFindingPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
