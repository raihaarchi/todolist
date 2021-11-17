import { useState } from 'react';

const useIconSelection = () => {
  const [category, setCategory] = useState(0);
  const [isIconSelection, setIsIconSelection] = useState(false);
  return {
    category, setCategory, isIconSelection, setIsIconSelection
  };
};

export default useIconSelection;