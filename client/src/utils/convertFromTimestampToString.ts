const convertFromTimestampToString = (unformattedDate: string): string => {
  const month = new Date(unformattedDate).getUTCMonth() + 1;
  const day = new Date(unformattedDate).getUTCDate();
  const year = new Date(unformattedDate).getUTCFullYear();

  return `${month}/${day}/${year}`;
};

export default convertFromTimestampToString;
