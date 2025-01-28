export const convertToAmPm = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

// Function to check if a time is in valid 24-hour format (HH:mm)
export function isValid24HourTime(time) {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
}