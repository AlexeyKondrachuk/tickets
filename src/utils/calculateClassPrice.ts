export const calculateClassPrice = (
    selectedSeats: number[],
    priceClass: number[],
    numberAdults: number,
    numberChildren: number,
    isWifi: boolean,
    isLinens: boolean,
    wifiPrice: number,
    linens_price: number
  ) => {
    let price14class = 0;
    let priceAdults14Class = 0;
    let priceChildren14Class = 0;
  
    let price2class = 0;
    let priceAdults2Class = 0;
    let priceChildren2Class = 0;
  
    let price3class = 0;
    let priceAdults3Class = 0;
    let priceChildren3Class = 0;
  
    const maxIndex = numberAdults + numberChildren;
  
    // Расчет для 1 и 4-го класса
    selectedSeats.forEach((_, index) => {
      if (index >= maxIndex) return;
  
      if (index < numberAdults) {
        price14class += priceClass[0];
        priceAdults14Class += priceClass[0];
      } else {
        price14class += priceClass[0] / 2;
        priceChildren14Class += priceClass[0] / 2;
      }
    });
  
    // Расчет для 2-го класса
    selectedSeats.forEach((num, index) => {
      if (index >= maxIndex) return;
  
      if (index < numberAdults) {
        if (num % 2 === 0) {
          price2class += priceClass[2];
          priceAdults2Class += priceClass[2];
        } else {
          price2class += priceClass[1];
          priceAdults2Class += priceClass[1];
        }
      } else {
        if (num % 2 === 0) {
          price2class += priceClass[2] / 2;
          priceChildren2Class += priceClass[2] / 2;
        } else {
          price2class += priceClass[1] / 2;
          priceChildren2Class += priceClass[1] / 2;
        }
      }
    });
  
    // Расчет для 3-го класса
    selectedSeats.forEach((num, index) => {
      if (index >= maxIndex) return;
  
      if (num >= 33) {
        if (index < numberAdults) {
          price3class += priceClass[3];
          priceAdults3Class += priceClass[3];
        } else {
          price3class += priceClass[3] /2;
          priceChildren3Class += priceClass[3] / 2;
        }
      } else {
        if (index < numberAdults) {
          if (num % 2 === 0) {
            price3class += priceClass[2];
            priceAdults3Class += priceClass[2];
          } else {
            price3class += priceClass[1];
            priceAdults3Class += priceClass[1];
          }
        } else {
          if (num % 2 === 0) {
            price3class += priceClass[2] / 2;
            priceChildren3Class += priceClass[2] / 2;
          } else {
            price3class += priceClass[1] / 2;
            priceChildren3Class += priceClass[1] / 2;
          }
        }
      }
    });
  
    // Финальная цена с учетом дополнительных опций (Wi-Fi и постельное белье)
    const totalPrice14Class =
      price14class + (isLinens ? linens_price : 0) + (isWifi ? wifiPrice : 0);
    const totalPrice2Class =
      price2class + (isLinens ? linens_price : 0) + (isWifi ? wifiPrice : 0);
    const totalPrice3Class =
      price3class + (isLinens ? linens_price : 0) + (isWifi ? wifiPrice : 0);
  
    return {
      totalPrice14Class,
      priceAdults14Class,
      priceChildren14Class,
      totalPrice2Class,
      priceAdults2Class,
      priceChildren2Class,
      totalPrice3Class,
      priceAdults3Class,
      priceChildren3Class,
    };
  };