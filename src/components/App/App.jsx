import React from 'react';
import { Switch } from 'react-router-dom';
// Router
import routes from '../../routes';
// Layout
import AppRoute from '../../layout/AppRoute';
// Style
import './style.scss';

const App = () => {
  const routeApp = routes.map(({
    path, layout, Component,
  } ) => {
    const renderComponent = () => (
      <React.Suspense fallback={(
        <div className="containerCircle">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </div>
      )}
      >
        <Component />
      </React.Suspense>
    );
    return (
      <AppRoute exact path={path} layout={layout} render={renderComponent} key={path} />
    );
  });
  return (
    <Switch>
      {routeApp}
    </Switch>
)};

export default App;
