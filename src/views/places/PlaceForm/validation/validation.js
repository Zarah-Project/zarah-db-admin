import * as yup from 'yup';

const validation = yup.object().shape({
  place_name: yup.string().when('country', {
    is: (country) => !country || country.length === 0,
    then: yup.string().required('Either Place Name or Country is required'),
    otherwise: yup.string()
  }),
  country: yup.string().when('place_name', {
    is: (place_name) => !place_name || place_name.length === 0,
    then: yup.string().required('Either Place Name or Country is required'),
    otherwise: yup.string()
  })
}, [['place_name', 'country']]);

export default validation;
