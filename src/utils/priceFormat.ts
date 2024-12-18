export const priceFormat = (
    classTypeDeparture: string,
    totalPrices: {
      totalPrice14ClassDeparture: number;
      totalPrice2ClassDeparture: number;
      totalPrice3ClassDeparture: number;
    }
  ): string => {
    const { totalPrice14ClassDeparture, totalPrice2ClassDeparture, totalPrice3ClassDeparture } = totalPrices;
  
    const price =
      (classTypeDeparture === 'first' || classTypeDeparture === 'fourth')
        ? totalPrice14ClassDeparture
        : classTypeDeparture === 'second'
        ? totalPrice2ClassDeparture
        : classTypeDeparture === 'third'
        ? totalPrice3ClassDeparture
        : 0;
  
    return price.toLocaleString('ru-RU'); 
  };