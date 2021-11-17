import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
  <>
    <h3>Такой страницы нет</h3>
    <Link
      exact
      to="/"
    >
      Вернуться на главную
    </Link>
  </>
);

export default Error;
