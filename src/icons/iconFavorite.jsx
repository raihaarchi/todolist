import React from 'react';
import PropTypes from 'prop-types';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
// Components
import Button from '../components/Button';
// Style
import './style.scss';

const IconFavorite = ({ onFavoriteTask, favorite, isDisabled }) => (
  <Button
    onClick={onFavoriteTask}
    className="button--favorite"
    disabled={isDisabled}
    favorite={favorite}
    type="button"
  >
    <StarRoundedIcon className="icon-favorite" />
  </Button>
);

IconFavorite.defaultProps = {
  favorite: false,
  isDisabled: false,
  onFavoriteTask: () => {},
};

IconFavorite.propTypes = {
  favorite: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onFavoriteTask: PropTypes.func,
};

export default IconFavorite;
