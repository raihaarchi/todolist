import React from 'react';
import PropTypes from 'prop-types';
// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
// Style
import './style.scss';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main className="main__container">
      {children}
    </main>
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
