function dateFormatter(val) {
  let date = new Date(val);

  return date.getDay() + "/" + date.getMonth() + '/' + date.getFullYear();
}

function locationFormatter(location) {
  return location.city + ", " + location.country;
}

function extractYearFromDate(val) {
  let date = new Date(val);

  return date.getFullYear();
}

export { dateFormatter, locationFormatter, extractYearFromDate };