export const validationMessages = {
  name: 'Otel adı 3 ile 30 karakter arasında olmalıdır.',
  responsible: 'Yetkili kişi 3 ile 30 karakter arasında olmalıdır.',
  phone: 'Telefon numarası 10 karakter olmalıdır.',
  email: 'Lütfen geçerli bir email giriniz.',
};

export const getIsValid = (field, value) => {
  if (field === 'name') return value.length >= 3 && value.length <= 30;
  if (field === 'responsible') return value.length >= 3 && value.length <= 30;

  if (field === 'phone') return value.length === 10;

  if (field === 'email') {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
  }
};

export const getValidationMessage = (field, value = '', formValues) => {
  if (field === 'name' && !formValues[field].isValid) {
    return validationMessages.name;
  }
  if (field === 'responsible' && !formValues[field].isValid) {
    return validationMessages.responsible;
  }
  if (field === 'phone' && !formValues[field].isValid) {
    return validationMessages.phone;
  }
  if (field === 'email' && !formValues[field].isValid) {
    return validationMessages.email;
  }

  return '';
};

export const isFormValid = (formValues) => {
  return Object.values(formValues).every((field) => field.isValid);
};
