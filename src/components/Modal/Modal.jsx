import React, { useRef } from 'react';
// Hooks 
import useQuery from '../../hooks/useQuery';
// Components
import Setting from '../Setting';
// Style
import './style.scss'

const Modal = () => {
  const {history, location } = useQuery();
  const refBack = useRef(null);
  const pushSearch = (e) => {
    if (e.target.className === refBack.current.className) {
      history.push({
        pathname: location.pathname,
        search:''
        })
    }
  }

  return (
    <>
      {location.search === '?SettingIcons' && (
      <div
        className="Modal"
        onClick={pushSearch}
        ref={refBack}
      >
        <Setting />
      </div>
  )}
    </> 
  );
};

export default Modal;