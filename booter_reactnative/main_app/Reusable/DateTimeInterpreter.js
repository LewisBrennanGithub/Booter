const getOrdinalIndicator = (day) => {
    if (day > 3 && day < 21) return day + 'th'; 
    switch (day % 10) {
      case 1:  return day + "st";
      case 2:  return day + "nd";
      case 3:  return day + "rd";
      default: return day + "th";
    }
  }
  
  export const formatGameDateAndTime = (isoString) => {
    const dateObj = new Date(isoString);
    
    const day = getOrdinalIndicator(dateObj.getUTCDate());
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getUTCFullYear();
    const hours = dateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}, ${day} ${month} ${year}`;
  }
  
