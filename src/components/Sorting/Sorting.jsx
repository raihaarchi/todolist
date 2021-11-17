import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Hooks
import useSearch from '../../hooks/useSearch';
import useQuery from '../../hooks/useQuery';
// Components
import Checkbox from '../Checkbox';
import Button from '../Button';
// Style
import './style.scss';

const SortTasks = ({ completed }) => {
  const { sortingSearch,filteringSearch,completedPath,
  } = useSearch(completed);
  const [isSort, setSort] = useState({
    stateName: false,
    stateDate: false,
  });
  const {history } = useQuery();

  useEffect(() => {
    if (sortingSearch) {
      setSort({
        stateName: sortingSearch.includes('title'),
        stateDate: sortingSearch.includes('dateOfCreat'),
      });
    } else setSort({ stateName: false, stateDate: false });
  }, [sortingSearch]);

  const onClickDate = () => {
    setSort({ ...isSort, stateDate: !isSort.stateDate });
  };

  const onClickName = () => {
    setSort({ ...isSort, stateName: !isSort.stateName });
  };

  const applySorting = () => {
    const date = isSort.stateDate ? 'dateOfCreat,' : '';
    const name = isSort.stateName ? 'title' : '';
    const sortingOptions = date || name ? `sort=${date}${name}` : '';
    history.push({
      pathname: completedPath,
      search: filteringSearch ? `${sortingOptions}&icon=${filteringSearch}` : `${sortingOptions}`,
    });
  };

  const throwSorting = () => {
    setSort({ stateDate: false, stateName: false });
    history.push({
      pathname: completedPath,
      search: filteringSearch ? `?icon=${filteringSearch}`: '',
    });
  };

  return (
    <div className="Sorting main__sorting">
      <div className="Sorting__content-left">
        <Checkbox
          className="Sorting__checkbox"
          heading="sort by date"
          checked={isSort.stateDate}
          onClick={onClickDate}
          id="checkboxDate"
        />
        <Checkbox
          className="Sorting__checkbox"
          heading="sort by name"
          checked={isSort.stateName}
          onClick={onClickName}
          id="checkboxName"
        />
      </div>
      <Button
        active={!!sortingSearch}
        onClick={applySorting}
        secondary
        className="Sorting__button"
        type="button"
      >
        SORT  
      </Button>
      <Button
        active={!sortingSearch}
        onClick={throwSorting}
        secondary
        className="Sorting__button"
        type="button"
      >
        RESET
      </Button>
    </div>
  );
};

SortTasks.defaultProps = {
  completed: false,
};

SortTasks.propTypes = {
  completed: PropTypes.bool,
};

export default SortTasks;
