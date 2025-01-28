export const convertTo24Hour = (timeAmPm : string) => {
    const [time, period] = timeAmPm.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const hours24 =
      period === "PM" ? (hours % 12) + 12 : hours % 12; // Convert PM hours and handle 12 AM/PM edge cases
    return `${hours24.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
};

// Function to calculate time ago
export const convertTime = (time: string) => {
    const currentTime = new Date().getTime();
    const orderTime = new Date(time).getTime();
    const timeDifference = Math.abs(currentTime - orderTime); // Difference in milliseconds

    // Convert milliseconds to a readable format
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);    

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
};
  