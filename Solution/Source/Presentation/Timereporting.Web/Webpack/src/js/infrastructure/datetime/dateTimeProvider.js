// A class for providing date and time information
class dateTimeProvider {
  // Get the current date and time
  static getCurrentDateTime() {
    const currentDate = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    };
    // Return the formatted current date and time as a string
    return currentDate.toLocaleString('en-GB', options);
  }

  // Get the current time
  static getCurrentTime() {
    const currentDate = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    };
    // Return the formatted current time as a string
    return currentDate.toLocaleString('en-GB', options);
  }
}

export default dateTimeProvider; 