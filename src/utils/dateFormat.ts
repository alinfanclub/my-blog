export default function dateFormat(date: Date) {
  const newDate = new Date(date);
  const localDate = newDate.toLocaleDateString();
  const localTime = newDate.toLocaleTimeString();

  return `${localDate} ${localTime}`;
}
