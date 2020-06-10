const decodeValues = (values) => {
  const {dates, classifications, explanations, consents, files, ...formValues} = values;

  if (dates.length === 0) {
    formValues['dates'] = [{date_from: '', date_to: '', event: ''}]
  } else {
    formValues['dates'] = dates
  }

  formValues['classifications'] = {};
  classifications.forEach((classification) => {
    const key = classification['category_key'];
    const obj = {
      id: classification['id'],
      field_id: classification['field_id'],
      category_key: classification['category_key'],
      field_type: classification['field_type'],
      full_name: classification['full_name'],
      text: classification['text'],
    };
    if (Object.keys(formValues['classifications']).includes(key)) {
      formValues['classifications'][key].push(obj)
    } else {
      formValues['classifications'][key] = [obj]
    }
  });

  formValues['explanations'] = {};
  explanations.forEach((explanation) => {
    const key = explanation['category'];
    formValues['explanations'][key] = {
      id: explanation['id'],
      text: explanation['explanation'],
    }
  });

  formValues['consents'] = {};
  consents.forEach((consent) => {
    const key = consent['consent_type'];
    formValues['consents'][key] = {
      id: consent['id'],
      consent: consent['consent'],
      consent_text: consent['consent_text'],
    }
  });

  formValues['file_id'] = files.length > 0 ? files[0]['file_id'] : '';
  formValues['file_url'] = files.length > 0 ? files[0]['file_url'] : '';

  return formValues;
};

export default decodeValues;
