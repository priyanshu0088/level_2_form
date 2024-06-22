// src/hooks/useForm.js
import { useState, useEffect } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues((prevValues) => {
        const newSkills = checked
          ? [...prevValues.additionalSkills, value]
          : prevValues.additionalSkills.filter((skill) => skill !== value);
        return {
          ...prevValues,
          additionalSkills: newSkills
        };
      });
    } else {
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('Form submitted successfully');
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting
  };
};

export default useForm;
