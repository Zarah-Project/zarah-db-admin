import * as yup from 'yup';

const userPasswordChangeValidation = yup.object().shape({
  current_password: yup.string()
    .required('This field is required'),
  new_password: yup.string()
    .required('This field is required'),
  re_new_password: yup.string()
    .oneOf([yup.ref('new_password'), null], 'Two passwords should match')
    .required('This field is required')
});

export default userPasswordChangeValidation;
