import queryString from 'query-string';
// Hooks 
import useQuery from './useQuery';

const useSearch = (completed) => {
  const {location } = useQuery();
  const filteringSearch = queryString.parse(location.search).icon || '';
  const sortingSearch = queryString.parse(location.search).sort || '';
  const completedPath = completed ? '/completed-tasks' : '/';
  return {
    sortingSearch,
    filteringSearch,
    completedPath,
  };
};

export default useSearch;
