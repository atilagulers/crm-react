export const validationMessages = {
  tc: 'TC 10 ile 11 karakter arasında olmalıdır.',
  firstName: 'Müşteri adı 3 ile 30 karakter arasında olmalıdır.',
  lastName: 'Müşteri soyadı 3 ile 30 karakter arasında olmalıdır.',
  phone1: 'Telefon numarası 10 karakter olmalıdır.',

  email: 'Lütfen geçerli bir email giriniz.',
  birthday: 'Lütfen geçerli bir doğum tarihi giriniz.',
};

export const getIsValid = (field, value) => {
  //if (field === 'tc') return value.length >= 10 && value.length <= 10;

  if (field === 'firstName') return value.length >= 3 && value.length <= 30;

  if (field === 'lastName') return value.length >= 3 && value.length <= 30;

  if (field === 'phone1') return value.length === 10;

  //if (field === 'email') {
  //  const emailRegex =
  //    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //  return emailRegex.test(value);
  //}

  if (field === 'birthday') return value.length === 10;

  return true;
};

export const getValidationMessage = (field, value = '', formValues) => {
  if (field === 'tc' && !formValues[field].isValid) {
    return validationMessages.tc;
  }
  if (field === 'firstName' && !formValues[field].isValid) {
    return validationMessages.firstName;
  }
  if (field === 'lastName' && !formValues[field].isValid) {
    return validationMessages.firstName;
  }
  if (field === 'phone1' && !formValues[field].isValid) {
    return validationMessages.phone1;
  }
  if (field === 'email' && !formValues[field].isValid) {
    return validationMessages.email;
  }
  if (field === 'birthday' && !formValues[field].isValid) {
    return validationMessages.birthday;
  }

  return '';
};

export const isFormValid = (formValues) => {
  return Object.values(formValues).every((field) => field.isValid);
};
