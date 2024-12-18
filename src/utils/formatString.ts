export const formatString = (input: string): string => {

    const trimmed = input.slice(2);
  
  
    const pattern = [3, 3, 2, 2];
    let formatted = "";
    let currentIndex = 0;
  
    for (const length of pattern) {
      const chunk = trimmed.slice(currentIndex, currentIndex + length);
      if (chunk) {
        formatted += (formatted ? " " : "") + chunk; 
        currentIndex += length;
      }
    }
  
    return formatted;
  };