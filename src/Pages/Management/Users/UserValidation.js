export const validationMessages = {
  firstName: 'Ad 3 ile 20 karakter arasında olmalıdır.',
  lastName: 'Soyad 3 ile 20 karakter arasında olmalıdır.',
  username: 'Kullanıcı Adı 3 ile 20 karakter arasında olmalıdır.',
  password: 'Şifre en az 8 karakter arasında olmalıdır.',
};

export const getIsValid = (field, value) => {
  if (field === 'firstName' || field === 'lastName' || field === 'username')
    return value.length >= 3 && value.length <= 20;

  if (field === 'password') return value.length >= 8;

  if (field === 'role') return true;
};

export const getValidationMessage = (field, value = '', formValues) => {
  if (field === 'firstName' && !formValues[field].isValid) {
    return validationMessages.firstName;
  }
  if (field === 'lastName' && !formValues[field].isValid) {
    return validationMessages.lastName;
  }
  if (field === 'username' && !formValues[field].isValid) {
    return validationMessages.username;
  }
  if (field === 'password' && !formValues[field].isValid) {
    return validationMessages.password;
  }

  return '';
};

export const isFormValid = (formValues) => {
  return Object.values(formValues).every((field) => field.isValid);
};
