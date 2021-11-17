import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
// Icons
import SetIcon from '../../icons/SetIcon';
// Hooks
import useSearch from '../../hooks/useSearch';
import useIconSelection from '../../hooks/useIconSelection';
import useQuery from '../../hooks/useQuery';
// Components
import ModalFilter from './ModalFilter';
import Button from '../Button';
import FilterInput from './FilterInput';
// State
import { setCategoriesSelector } from '../../store/filtering/selectors';
// Style
import style from './style.scss';


const cx = cn.bind(style);

const Filter = ({ completed }) => {
  const {category, setCategory, isIconSelection, setIsIconSelection} = useIconSelection();
  const { sortingSearch, filteringSearch, completedPath,
  } = useSearch(completed);
  const {history } = useQuery();
  const categories = useSelector(setCategoriesSelector);
  const classBack = cx('back', { 'back--hide': !isIconSelection });
  const checkCategory = categories.filter(({id}) => id === category);
  const renderSelectCategory = categories.length && checkCategory.length ? categories.find(({id}) => id === category) : {};

  const openIconSelection = () => {
    setIsIconSelection(true);
  };

  const closeIconSelection = () => {
    setIsIconSelection(false);
  };

  useEffect(() => {
    if (filteringSearch) {
      setCategory(+filteringSearch);
    } else {
      setCategory(0)
    }
  }, [filteringSearch]);

  const filterByCategory = (id) => {
    setCategory(id)
  }
  const applyFilter = () => {
    const filteringOptions = category ? `&icon=${category}` : '';
    setCategory(category);
    history.push({
      pathname: completedPath,
      search: sortingSearch ? `?sort=${sortingSearch}${filteringOptions}` : `${filteringOptions}`,
    });
  };
  const throwFilter = () => {
    setCategory(0);
    history.push({
      pathname: completedPath,
      search: sortingSearch ? `?sort=${sortingSearch}` : '',
    });
    setCategory(0);
  };
  return (
    <div className={cx("Filter main__filter")}>
      <FilterInput category={category} />
      <div className="Filter__category">
        <div className="Filter-select">
          <h4 className="Filter-select__heading">Filtering by category</h4>
          <div className="Filter-select__preview-icon">
            <Button category onClick={openIconSelection} type="button">
              <SetIcon svg={renderSelectCategory} />
            </Button>
            <div className="Filter-select__name">{category ? renderSelectCategory.name : 'categories'}</div>
          </div>
        </div>

        {isIconSelection && (
        <>
          <ModalFilter closeIconSelection={closeIconSelection} filterByCategory={filterByCategory} />
          <div
            onClick={closeIconSelection}
            className={classBack}
            role="button"
          />
        </>
      )}
        <Button
          active={!!category}
          onClick={applyFilter}
          secondary
          className="Filter__button"
          type="button"
        >
          FILTER
        </Button>
        <Button
          active={!category}
          onClick={throwFilter}
          secondary
          className="Filter__button"
          type="button"
        >
          RESET
        </Button>
      </div>

    </div>
  );
};

Filter.defaultProps = {
  completed: false,
};

Filter.propTypes = {
  completed: PropTypes.bool,
};

export default Filter;
