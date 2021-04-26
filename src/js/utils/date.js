function dateFormatConvert(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dateFormat = new Date(date);

  const day = dateFormat.getDate();
  const month = monthNames[dateFormat.getMonth()];
  const year = dateFormat.getFullYear();

  const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDay = dateFormat.getDay();

  return `${day} ${month} ${year} ${weekNames[weekDay]}`;
}

export default dateFormatConvert;
