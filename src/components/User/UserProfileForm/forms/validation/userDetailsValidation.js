import * as yup from 'yup';

const userDetailsValidation = yup.object().shape({
  first_name: yup.string()
    .required('This field is required'),
  last_name: yup.string()
    .required('This field is required'),
  email: yup.string().email()
    .required('This field is required'),
});

export default userDetailsValidation;
