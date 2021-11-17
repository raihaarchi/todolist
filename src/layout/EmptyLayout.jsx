import React from 'react';
import PropTypes from 'prop-types';
// Style
import './style.scss';

const EmptyLayout = ({ children }) => (
  <div className="empty__container">
    {children}
  </div>
);

EmptyLayout.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default EmptyLayout;
