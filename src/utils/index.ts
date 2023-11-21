export const translateTimestamp = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);

  var formattedTime =
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ', ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();

  return formattedTime;
};
