import { useHistory, useLocation } from 'react-router-dom';

const useQuery = () => {
  const history = useHistory();
  const location = useLocation();
  return {
    history, location
  };
};

export default useQuery;