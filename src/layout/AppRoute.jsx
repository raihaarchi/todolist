import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppRoute = ({ render: Component, layout: Layout }) => (
  <Route
    exact
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

AppRoute.propTypes = {
  render: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};

export default AppRoute;
