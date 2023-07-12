export const formatDate = (date) => {
  const newDate = new Date(date);
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    //hour: 'numeric',
    //minute: 'numeric',
  };
  const formattedDate = newDate.toLocaleString('tr-TR', options);

  return formattedDate;
};
