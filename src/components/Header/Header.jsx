import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link, useLocation } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
// Store
import { isFetchingSelector } from '../../store/tasks/selectors';
// Icons
import IconSetting from '../../icons/iconSetting';
// Style
import './style.scss';

const Header = () => {
  const isFetching = useSelector(isFetchingSelector);
  const location = useLocation();
  return (
    <header className="Header">
      <div className="Header__wrapper container">
        <NavLink
          exact
          to="/"
          className="Header__link"
        >
          TO DO LIST
        </NavLink>
        <Link to={location.search === "?SettingIcons" ? {pathname: location.pathname, search: ""} : { pathname: location.pathname, search: "?SettingIcons" }}>
          <IconSetting />
        </Link>
      </div>
      {isFetching ? <LinearProgress className="Header__loader" /> : <div className="Header__loader--hide" />}
    </header>
  );
};

export default Header;
