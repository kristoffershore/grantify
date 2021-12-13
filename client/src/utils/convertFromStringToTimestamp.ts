const convertFromStringToTimestamp = (
  dateStringInMMDDYYY: string | undefined,
): string | null => {
  if (dateStringInMMDDYYY) {
    let [month, day, year] = dateStringInMMDDYYY.split('/');

    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
  return null;
};

export default convertFromStringToTimestamp;
