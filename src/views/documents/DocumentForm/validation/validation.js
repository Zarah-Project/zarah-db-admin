import * as yup from 'yup';

const validation = yup.object().shape({
  title: yup.string()
    .required('This field is required'),
  dates: yup.array()
    .of(
      yup.object()
        .shape({
          date_from: yup.string()
            .required('This field is required'),
        })
    )
});

export default validation;
