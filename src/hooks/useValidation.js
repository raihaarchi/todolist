import { useState } from 'react';

const useValidation = () => {
  const [validator, setValidator] = useState({
    validEmpty: '',
    validLength: '',
    validCategory: ''
  });
  return {
    validator, setValidator
  };
};

export default useValidation;