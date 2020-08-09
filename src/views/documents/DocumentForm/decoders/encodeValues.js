const encodeValues = (values) => {
  const {organisations, places, people, events, classifications, explanations, consents, file_id, file_url, ...formValues} = values;

  formValues['organisations'] = organisations.map((org) => {
    return org.value
  });

  formValues['places'] = places.map((place) => {
    return place.value
  });

  formValues['people'] = people.map((person) => {
    return person.value
  });

  formValues['events'] = events.map((event) => {
    return event.value
  });

  formValues['classifications'] = [];
  Object.keys(classifications).forEach((key) => {
    classifications[key].forEach((classification) => {
      formValues['classifications'].push({
        id: classification['id'],
        classification_field: classification['field_id'],
        classification_other_text: classification['text']
      })
    });
  });

  formValues['explanations'] = [];
  Object.keys(explanations).forEach((key) => {
    formValues['explanations'].push({
      id: explanations[key]['id'],
      category: key,
      explanation: explanations[key]['text']
    })
  });

  formValues['consents'] = [];
  Object.keys(consents).forEach((key) => {
    formValues['consents'].push({
      id: consents[key]['id'],
      consent_type: key,
      consent: consents[key]['consent'],
      consent_text: consents[key]['consent_text']
    })
  });

  formValues['files'] = [];
  formValues['files'].push({
    file_id: file_id,
    file_url: file_url
  });

  return formValues;
};

export default encodeValues;
