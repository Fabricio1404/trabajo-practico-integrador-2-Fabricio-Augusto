import { useState } from 'react';

export const useForm = (initialValues = {}) => {
  const [formValue, setFormValue] = useState(initialValues);
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue({
        ...formValue,
        [name]: value,

    })
  };

  const handleReset = () => {
    setFormValue(initialValues);
  };
    return { 
        handleChange,
        handleReset,
        formValue
    };
}