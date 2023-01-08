export default function toSemanticDate(date) {
  // Convert a date to a semantic date
  // e.g. 2020-01-01 -> 1st January 2020

  const day = date.getDate();
  const month = date.getMonth() + 1;

  const daySuffix = (() => {
    if (day === 1 || day === 21 || day === 31) return 'st';
    if (day === 2 || day === 22) return 'nd';
    if (day === 3 || day === 23) return 'rd';
    return 'th';
  })();

  const monthName = (() => {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return 'Unknown';
    }
  })();

  return `the ${day}${daySuffix} of ${monthName}`;
}