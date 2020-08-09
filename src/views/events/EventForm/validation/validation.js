import * as yup from 'yup';

const validation = yup.object().shape({
  date_from: yup.string()
    .required('This field is required'),
  event: yup.string()
    .required('This field is required')
});

export default validation;
