import React from 'react';
import PropTypes from 'prop-types';
// Icons
import IconTemplate from '../../../icons/iconTemplate';
// Style
import './style.scss';

const ModalFilter = ({ closeIconSelection, filterByCategory }) => (
  <IconTemplate
    className="modal-filter icons Filter__modal-filter"
    closeIconSelection={closeIconSelection}
    filterByCategory={filterByCategory}
    iconFlex="column"
    sizeIcon="sm"
    filterModal
  />
);

ModalFilter.propTypes = {
  closeIconSelection: PropTypes.func.isRequired,
};

export default ModalFilter;
