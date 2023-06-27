export const validationMessages = {
  name: 'Ad 3 ile 30 karakter arasında olmalıdır.',
};

export const getIsValid = (field, value) => {
  if (field === 'name') return value.length >= 3 && value.length <= 20;
};

export const getValidationMessage = (field, value = '', formValues) => {
  if (field === 'name' && !formValues[field].isValid) {
    return validationMessages.name;
  }
  return '';
};

export const isFormValid = (formValues) => {
  return Object.values(formValues).every((field) => field.isValid);
};
