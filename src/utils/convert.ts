
export default function convertUnixToDateTime(
    unixSeconds: number | undefined
  ): { 
    year: number; 
    month: string; 
    day: string; 
    hours: string; 
    minutes: string; 
  } | undefined {
    if (unixSeconds !== undefined) {
      const date = new Date(unixSeconds * 1000);
  
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      return {
        year,
        month,
        day,
        hours,
        minutes,
      };
    }
  
    return undefined;
  }