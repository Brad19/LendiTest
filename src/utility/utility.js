
export function timeDifference(targetDate, type) {
  var difference = new Date().getTime() - targetDate;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  const days =
    daysDifference > 1 ? `${daysDifference > 1} days` : `${daysDifference} day`;

  const hours = hoursDifference > 0 ? `${hoursDifference}h` : '';
  if (type === 'hours') {
    return `${hours}`;
  }
  if (daysDifference && hoursDifference) {
    return `${hoursDifference}h ${daysDifference} days`;
  } else if (!daysDifference && hoursDifference) {
    return `${hours} h`;
  } else {
    return `${days} days;`;
  }
}
