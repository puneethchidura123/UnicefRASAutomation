export function incrementDate(dateString: string, days: number): string {
  const [day, month, year] = dateString.split(".").map(Number);
  const date = new Date(year, month - 1, day); // Months are 0-based in JS Date
  date.setDate(date.getDate() + days);

  // Format date back to dd.mm.yyyy
  const newDay = String(date.getDate()).padStart(2, "0");
  const newMonth = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const newYear = date.getFullYear();

  return `${newDay}.${newMonth}.${newYear}`;
}
