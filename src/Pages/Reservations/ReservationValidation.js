export const validationMessages = {
  departureDate: 'Gidiş tarihi boş bırakılamaz.',
  departureTime: 'Gidiş saati boş bırakılamaz.',
  departureDestination: 'Gidiş yeri boş bırakılamaz.',
  departurePNR: 'Gidiş PNR boş bırakılamaz.',
  returnDate: 'Dönüş tarihi boş bırakılamaz.',
  returnTime: 'Dönüş saati boş bırakılamaz.',
  returnDestination: 'Dönüş yeri boş bırakılamaz.',
  returnPNR: 'Dönüş PNR boş bırakılamaz.',
  lastName: 'Soyad 3 ile 20 karakter arasında olmalıdır.',
  username: 'Kullanıcı Adı 3 ile 20 karakter arasında olmalıdır.',
  password: 'Şifre en az 8 karakter arasında olmalıdır.',
};

export const getIsValid = (field, value) => {
  if (field === 'firstName' || field === 'lastName' || field === 'username')
    return value.length >= 3 && value.length <= 20;

  if (field === 'departureDate' || field === 'returnDate') return value !== '';

  if (field === 'departureTime' || field === 'returnTime') {
    return value !== undefined && value !== null && value !== '';
  }

  if (field === 'departureDestination' || field === 'returnDestination') {
    return value.length > 1;
  }

  if (field === 'departurePNR' || field === 'returnPNR') {
    return value.length > 1;
  }

  return true;
};

export const getValidationMessage = (field, value = '', formValues) => {
  if (field === 'departureDate' && !formValues[field].isValid) {
    return validationMessages.departureDate;
  }
  if (field === 'departureTime' && !formValues[field].isValid) {
    return validationMessages.departureTime;
  }
  if (field === 'departureDestination' && !formValues[field].isValid) {
    return validationMessages.departureDestination;
  }
  if (field === 'departureDestination' && !formValues[field].isValid) {
    return validationMessages.departureDestination;
  }

  return '';
};

export const isFormValid = (formValues) => {
  return Object.values(formValues).every((field) => field.isValid);
};
