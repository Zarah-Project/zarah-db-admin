import * as yup from 'yup';

const validation = yup.object().shape({
  first_name: yup.string()
    .required('This field is required'),
  last_name: yup.string()
    .required('This field is required'),
});

export default validation;
