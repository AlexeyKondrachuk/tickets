import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { priceFormat } from "../utils/priceFormat";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { resetUserInfo } from "../Redux/Slice/userInfo";

import "../styles/orderPage.scss";

export const OrderPage = () => {
  const dispatch = useAppDispatch();

  const {
    totalPrice14ClassDeparture,
    totalPrice2ClassDeparture,
    totalPrice3ClassDeparture,
  } = useAppSelector((state) => state.totalPrice);
  const { classTypeDeparture } = useAppSelector((state) => state.classType);
  const { first_name, patronymic } = useAppSelector(
    (state) => state.userInfo.user
  );

  const formattedNumber = priceFormat(classTypeDeparture, {
    totalPrice14ClassDeparture,
    totalPrice2ClassDeparture,
    totalPrice3ClassDeparture,
  });
  const location = useLocation();
  console.log(location);

  const [rating, setRating] = useState<number>(0);

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  const navigate = useNavigate(); // Хук для навигации

  const handleGoHome = () => {
    dispatch(resetUserInfo());
    navigate("/");
  };

  return (
    <div className="order-wrapper">
      <h3 className="order-title">Благодарим Вас за заказ!</h3>

      <div className="order-info">
        <div className="order-info-header">
          <span className="order_number">№Заказа</span>
          <span className="amount">
            сумма <span> {formattedNumber} </span>
            &#8381;
          </span>
        </div>

        <div className="order-info-body">
          <div className="icon_instruction">
            <div>
              <svg
                width="155"
                height="155"
                viewBox="0 0 155 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="77.4223"
                  cy="77.5"
                  rx="77.4223"
                  ry="77.5"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M141.197 77.5C141.197 112.68 112.68 141.198 77.5 141.198C42.3203 141.198 13.8008 112.68 13.8008 77.5C13.8008 42.3201 42.3203 13.8013 77.5 13.8013C112.68 13.8013 141.197 42.3201 141.197 77.5ZM60.0898 108.5V102.767H74.3164V97.0342H37.1582C37.2637 79.9417 37.2637 62.8494 37.2637 45.6506H117.312V97.0342H80.1543V102.767H94.3809V108.5H60.0898ZM42.998 91.3013H111.58V51.2773H42.998V91.3013ZM102.344 81.3218C102.236 81.3218 100.432 81.5342 99.2637 82.4897C98.416 83.2329 98.3086 84.2944 98.2031 85.4624L55.9492 85.25C56.375 84.1882 55.9492 83.0205 55.207 82.2773C54.25 81.428 53.4023 81.2158 52.0215 81.3218L52.127 59.9829C52.0215 59.9829 53.084 59.8767 53.5078 59.7705C54.9941 59.4519 55.7363 58.3904 56.4805 56.6917C56.6934 56.2671 56.6934 55.8425 56.7988 55.5239L98.3086 55.7363C98.627 58.2842 100.113 59.5581 102.449 59.8767L102.344 81.3218ZM62.4258 68.7944V71.0239L70.2812 70.8115V68.582L62.4258 68.7944ZM62.4258 64.3354V66.5649L79.3066 66.2466V64.0171L62.4258 64.3354ZM88.2227 59.1335C88.2227 59.7705 88.3301 60.0891 88.7539 60.3013C89.3906 60.6199 90.1348 60.0891 90.1348 59.3459V56.5854H88.2227V59.1335ZM88.2734 65.9822C88.3164 66.135 88.3965 66.2551 88.543 66.3528C89.1797 66.7773 90.0293 66.2466 90.1348 65.5034V63.8047C90.1348 63.1677 89.709 62.8494 89.0723 62.8494C88.0117 62.9553 88.2227 64.4417 88.2227 65.291C88.2227 65.5776 88.2227 65.8025 88.2734 65.9822ZM88.252 72.1628C88.3301 72.311 88.4531 72.4321 88.6484 72.5103C89.2852 72.8286 90.1348 72.4041 90.0293 71.5547V69.8562C90.0293 69.3252 89.6035 68.9006 89.0723 68.9006C88.7637 68.9006 88.4902 69.0447 88.3164 69.2703C88.1914 69.4316 88.1172 69.6348 88.1172 69.8562V71.2363C88.1172 71.572 88.1172 71.9077 88.252 72.1628ZM88.9668 78.3494H89.2852C89.709 78.3494 90.1348 77.9246 90.1348 77.5V75.8013C90.1348 75.5503 89.9863 75.2993 89.7773 75.136C89.6328 75.0229 89.459 74.9519 89.2852 74.9519H88.9668C88.543 74.9519 88.2227 75.2705 88.2227 75.6951V77.6062C88.2227 78.0308 88.543 78.3494 88.9668 78.3494ZM88.2227 81.3218C87.9043 82.2773 88.1172 84.5068 88.1172 84.5068H90.1348V81.5342C90.1348 80.791 89.1797 80.2603 88.543 80.791C88.3301 80.8972 88.2227 81.1096 88.2227 81.3218Z"
                  fill="#FFB628"
                  fill-opacity="0.79"
                />
              </svg>
              <span>билеты будут отправлены на ваш e-mail</span>
            </div>
            <div>
              <svg
                width="155"
                height="155"
                viewBox="0 0 155 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="77.4223"
                  cy="77.5"
                  rx="77.4223"
                  ry="77.5"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M142 76C142 111.898 112.898 141 77 141C41.1016 141 12 111.898 12 76C12 40.1016 41.1016 11 77 11C112.898 11 142 40.1016 142 76ZM96.5527 108.443C97.9355 107.262 100.412 106.926 100.412 106.926L100.482 79.7039C97.4648 79.2205 95.5312 77.635 95.1914 74.3679L42.6035 74.0239C42.3867 74.4028 42.4824 74.9448 42.2734 75.4448C41.8105 76.4788 41.3496 77.3259 40.7773 77.9792C40.1719 78.6714 39.4414 79.1462 38.4551 79.395C38.2969 79.4368 38.0938 79.4773 37.8809 79.5139C37.6719 79.5503 37.4531 79.583 37.2617 79.6099C36.9102 79.6592 36.6504 79.6892 36.709 79.6855L36.6289 106.787C38.3848 106.617 39.5 106.914 40.6738 108.059C41.6445 108.913 42.1133 110.467 41.5391 111.903L95.1055 112.308C95.3086 110.773 95.3965 109.367 96.5527 108.443ZM49.7715 93.7969L49.707 90.9998L59.623 90.8135L59.6875 93.6104L49.7715 93.7969ZM49.7559 88.0742L49.6895 85.2771L71.1074 84.9285L71.1719 87.7253L49.7559 88.0742ZM82.5801 79.7498C82.5625 79.7061 82.5469 79.6602 82.5332 79.6118C82.4727 79.3923 82.4492 79.1255 82.4531 78.8083L82.4414 77.5598L82.4316 76.4058L82.4219 75.583L84.8555 75.5544L84.8398 78.9653C84.8477 80 83.918 80.6663 83.1016 80.2905C82.8457 80.1819 82.6797 80.0039 82.5801 79.7498ZM82.4824 87.2146C82.4355 87.031 82.416 86.8125 82.4219 86.5432C82.4199 86.3931 82.4121 86.2229 82.4043 86.0415C82.3574 84.9714 82.291 83.5068 83.4336 83.4363C84.2812 83.3838 84.8008 83.8389 84.791 84.6311L84.752 86.7646C84.7949 87.4204 84.4102 87.905 83.9141 88.0532C83.5859 88.1516 83.207 88.1018 82.875 87.855C82.6816 87.6846 82.5527 87.4883 82.4824 87.2146ZM83.0371 95.7605C82.3496 95.4985 82.3652 94.8279 82.3828 94.157C82.4062 93.6074 82.3652 93.001 82.4473 92.3872C82.4551 92.0396 82.5957 91.7166 82.8242 91.4885C83.0352 91.2766 83.3203 91.147 83.6445 91.1562C84.3145 91.1758 84.8965 91.6877 84.8809 92.3586L84.9062 94.5491C84.8848 94.928 84.7324 95.26 84.502 95.4995C84.1367 95.8782 83.5781 96.0256 83.0371 95.7605ZM83.8301 103.079L83.4668 103.102C82.916 103.075 82.5859 102.669 82.5527 102.184L82.5762 99.8079C82.6016 99.2583 83.0059 98.929 83.4902 98.8989L83.8555 98.8765C84.1953 98.8931 84.5254 99.0747 84.7207 99.3418C84.8398 99.5049 84.9082 99.6997 84.8984 99.908L84.9219 102.098C84.8984 102.648 84.4375 103.042 83.8301 103.079ZM82.4004 110.84C82.4004 110.84 82.2129 108.05 82.4961 106.815C82.6016 106.565 82.707 106.315 82.877 106.122C83.6211 105.406 84.8828 106.059 84.8906 107.094L84.8984 110.868L82.4004 110.84ZM99.4961 68.5615L99.8203 71.5859C99.9746 72.9768 100.387 73.6821 102.166 73.8767L105.119 74.3032L105.104 80.4541L114.914 80.5178C115.031 79.7305 115.111 78.9456 115.357 78.2451C115.555 77.6877 115.857 77.1838 116.369 76.7744C117.752 75.593 120.227 75.2576 120.227 75.2576L120.428 48.1489C117.41 47.6655 115.477 46.0801 115.137 42.813L62.4844 42.4121C62.375 42.6016 62.3457 42.8318 62.3164 43.0771V43.094C62.2871 43.3342 62.2559 43.5886 62.1523 43.833C61.1992 45.9622 60.252 47.2993 58.3359 47.7832C57.7363 47.9419 56.5312 48.1382 56.5879 48.0737L56.5332 68.2319L99.4961 68.5615ZM69.6523 62.1848L69.5859 59.3879L79.502 59.2017L79.5684 61.9985L69.6523 62.1848ZM103.428 67.2227L103.791 67.2002C104.342 67.2271 104.859 67.6821 104.834 68.2317L104.859 70.4221C104.836 70.9717 104.383 71.4868 103.832 71.46L103.469 71.4824C102.918 71.4556 102.586 71.0498 102.555 70.5647L102.578 68.1885C102.529 67.9209 102.602 67.6755 102.754 67.499C102.908 67.3179 103.148 67.209 103.428 67.2227ZM103.58 59.48C104.252 59.4995 104.834 60.0115 104.818 60.6824L104.842 62.8728C104.842 63.7861 103.848 64.3958 103.031 64.02C102.65 63.8225 102.506 63.4993 102.441 63.1404C102.406 62.9502 102.395 62.7498 102.383 62.5532L102.375 62.4163C102.4 61.8669 102.359 61.2605 102.439 60.6465C102.344 60.1045 102.854 59.5251 103.58 59.48ZM103.377 51.8813C103.822 51.8538 104.176 51.9653 104.41 52.1917C104.625 52.3977 104.74 52.6987 104.736 53.0762L104.697 55.2097C104.705 56.2444 103.531 56.9258 102.756 56.2429C102.432 55.9585 102.287 55.6021 102.303 54.9314C102.303 54.804 102.299 54.6628 102.293 54.5132C102.256 53.4482 102.207 51.9536 103.377 51.8813ZM104.801 43.9995L104.785 47.4104C104.785 48.3237 103.855 48.99 103.037 48.6143C102.752 48.4929 102.58 48.2856 102.486 47.9832C102.414 47.7549 102.387 47.4724 102.391 47.1321L102.379 45.5859L102.357 43.9067L104.801 43.9995ZM90.9863 53.3167L91.0527 56.1135L69.6348 56.4622L69.5703 53.6653L90.9863 53.3167Z"
                  fill="#FDC354"
                />
              </svg>

              <span>распечатайте и сохраняйте билеты до даты поездки</span>
            </div>{" "}
            <div>
              <svg
                width="155"
                height="155"
                viewBox="0 0 155 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="77.4223"
                  cy="77.5"
                  rx="77.4223"
                  ry="77.5"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M141.197 77.5C141.197 112.68 112.68 141.198 77.5 141.198C42.3203 141.198 13.8008 112.68 13.8008 77.5C13.8008 42.3201 42.3203 13.8013 77.5 13.8013C112.68 13.8013 141.197 42.3201 141.197 77.5ZM80.2988 105.946C81.6797 102.767 82.9238 97.0452 83.2715 93.4551C83.5098 90.4673 82.9121 82.5793 82.793 80.189H83.2715L86.9727 82.3403L91.9863 88.1965L85.5391 90.4673L90.9121 95.3674L77.0625 113.653L63.2109 95.3674L68.4648 90.3479L62.0176 88.1965L66.9121 82.4597L70.6152 80.3086H71.0918C70.8535 82.5793 70.375 90.5869 70.6152 93.5747C70.9727 97.1602 72.2852 103.255 73.7188 106.363L73.7988 106.521L74.6699 90.8257C74.6699 90.3477 75.1484 89.989 75.625 89.989H75.8652C74.791 89.989 73.9551 89.1526 73.9551 88.1963V87.2402L75.2676 85.3281C75.5078 85.2085 75.627 85.2085 75.8652 85.2085H78.1348C78.373 85.2085 78.6113 85.3281 78.7305 85.3281L80.0449 87.1208V88.1963C80.0449 88.2849 80.0391 88.3723 80.0254 88.4585C80.0098 88.5471 79.9883 88.634 79.9609 88.7188C79.7207 89.4377 79.0078 89.989 78.1348 89.989H78.6094C79.0879 89.989 79.5664 90.3477 79.5664 90.8257L80.2988 105.946ZM76.8867 112.117L76.6465 111.809L76.8223 112.219L76.8867 112.117ZM89.4746 83.416L101.057 88.6748C101.246 88.7695 101.436 88.8643 101.609 88.9736C101.875 89.1406 102.105 89.3423 102.25 89.6309L102.012 90.7065L96.4004 116.761V117H76.9375H75.9824H57.4766V116.761L51.8633 90.7065L51.625 89.6309C51.9824 89.2722 52.4609 88.9138 52.9375 88.6748L64.5195 83.416L59.9824 88.9138L66.1914 91.0649L61.5352 95.248L77.0566 115.685L92.459 95.1287L87.8027 90.9456L94.0117 88.7942L89.4746 83.416ZM56.2832 117L50.6719 90.9456C50.5273 91.2368 50.4258 91.5281 50.3672 91.8193C50.3301 92.0061 50.3125 92.1929 50.3125 92.3796L49 117H56.2832ZM97.7168 117H105L103.688 92.3794C103.688 91.9014 103.568 91.4233 103.328 90.9453L97.7168 117ZM62.168 56.0254C62.1562 56.0325 62.1465 56.0398 62.1348 56.0469L61.4199 54.8518L59.3887 51.3857C57.1211 51.3857 54.4941 48.5173 57.1211 45.8879C59.8672 43.0198 66.5527 38 76.8223 38C86.9707 38 93.7773 43.0198 96.5234 45.8879C99.0293 48.637 96.5234 51.5054 94.0156 51.1467L91.8652 54.7322L91.8457 54.7654C91.8516 54.7942 91.8574 54.8228 91.8633 54.8516L91.1465 56.0469C91.0137 55.9575 90.8633 55.8848 90.7012 55.8162L90.4277 55.7063C90.2344 55.6299 90.0332 55.5503 89.832 55.4492L88.2422 54.8127L88.1641 54.8518L87.4473 55.2102C87.3281 55.2703 87.2363 55.3 87.1445 55.3301L87.1211 55.3389C87.041 55.366 86.959 55.3955 86.8516 55.4492C86.7891 55.4492 86.7578 55.4807 86.7285 55.5115L86.6855 55.5476L86.7305 55.5688C86.7891 55.5688 86.8496 55.5986 86.9102 55.6284C86.9707 55.6582 87.0312 55.6882 87.0898 55.6882C87.3281 55.8079 87.6855 55.9272 88.0449 56.0469L88.627 56.291C89.3047 56.5735 90.0254 56.8718 90.6719 57.2419C90.6719 57.2419 90.6719 57.3616 90.791 57.3616L91.9844 57.8396L92.4629 57.0029V57.959C92.4629 59.1543 92.3418 60.23 91.9844 61.425C91.8652 61.5444 91.8652 61.7834 91.9844 61.7834C92.4629 62.8591 92.4629 64.7715 91.9844 66.6836C91.3867 68.9546 90.0742 71.3447 88.5215 71.3447H88.1641C88.1641 71.3447 88.1328 71.313 88.0859 71.2822C88.043 71.2534 87.9844 71.2253 87.9258 71.2253C85.6562 76.2449 81.7168 80.667 76.9395 80.667C72.1641 80.667 68.2246 76.2449 65.9551 71.2253C65.9551 71.3447 65.8359 71.3447 65.7168 71.3447H65.3594C63.8066 71.3447 62.4922 68.9546 61.8965 66.6836C61.2988 64.6519 61.2988 62.8591 61.8965 61.7834C61.8965 61.6641 61.7773 61.425 61.7773 61.3054V61.186C61.418 60.1104 61.2988 59.0347 61.2988 57.8396V56.7639L61.8965 57.72L62.9707 57.1226H63.0898C63.7363 56.7529 64.4531 56.4548 65.1328 56.1729L65.7168 55.9272C66.0742 55.8079 66.4336 55.6882 66.6719 55.5688L66.7539 55.564C66.6719 55.541 66.6562 55.4492 66.5527 55.4492C66.4336 55.3894 66.3438 55.3596 66.2539 55.3296L66.1289 55.2869C66.0781 55.2671 66.0215 55.2432 65.9551 55.2102L65.2402 54.8518L65.1777 54.8208C64.959 54.9299 64.707 55.0549 64.4453 55.1785C64.1504 55.3184 63.8438 55.4568 63.5645 55.5688C63.252 55.6472 62.9375 55.7773 62.6582 55.925C62.5117 56.0022 62.375 56.0842 62.252 56.1663L62.168 56.0254ZM64.2852 53.1785H64.3652L64.3301 53.1177C64.3164 53.0981 64.3008 53.0784 64.2812 53.0588L64.3379 53.0024C64.3242 52.9814 64.3066 52.9604 64.2852 52.9395L64.3438 52.8916C64.3281 52.8677 64.3086 52.8438 64.2852 52.8198L64.3398 52.7656C64.3301 52.7517 64.3184 52.7375 64.3066 52.7236C64.3008 52.7158 64.293 52.7083 64.2852 52.7004L64.6426 52.3418C65.1211 51.8638 65.5977 51.5054 66.0762 51.0271C68.8223 48.7563 72.6426 46.7246 76.7031 46.7246C80.8809 46.7246 84.582 48.637 87.4473 51.0271L87.1855 51.051C87.2734 51.1223 87.3613 51.1938 87.4473 51.2661C87.9258 51.6248 88.4043 52.1028 88.8809 52.5808L88.9395 52.6406L88.8809 52.4614L89.2383 52.8198C89.2168 52.8416 89.1973 52.8635 89.1836 52.8853L89.2383 52.9395C89.2168 52.9617 89.1992 52.9839 89.1836 53.0061L89.2363 53.0588C89.1816 53.1133 89.1523 53.1675 89.1367 53.2219L89.3574 53.7761L89.5977 54.0151C89.6523 54.0691 89.7305 54.0986 89.8105 54.1147C89.9082 54.1345 90.0098 54.1345 90.0742 54.1345C90.5449 54.1345 90.8984 53.7827 91.0234 53.2019C90.9746 52.6621 90.5234 52.3418 90.0723 52.3418H89.7129C89.2363 51.9834 88.877 51.5051 88.4004 51.1467V51.2661C85.416 48.637 81.2363 46.366 76.8184 46.366C72.2812 46.366 68.2207 48.637 65.2363 51.2661L65.1172 51.3857C64.8281 51.6023 64.541 51.8188 64.2773 52.0618C64.1055 52.2212 63.9453 52.3916 63.8047 52.5808C63.7344 52.511 63.6641 52.4819 63.5938 52.47C63.543 52.4614 63.4941 52.4614 63.4453 52.4614C62.8848 52.4614 62.5352 52.8816 62.4941 53.3279C62.5078 53.9087 62.9785 54.2542 63.4492 54.2542C63.5469 54.2542 63.623 54.2542 63.6895 54.2461C63.7852 54.2344 63.8555 54.2056 63.9258 54.1345C63.9258 54.1345 63.8867 54.1345 63.8535 54.1123C63.8281 54.0957 63.8066 54.0664 63.8066 54.0151C63.9258 54.0151 64.0449 53.8955 64.0449 53.7761L64.2852 53.1785ZM78.8477 50.2629C78.832 50.3984 78.7754 50.4968 78.7051 50.6172C78.6758 50.6687 78.6445 50.7241 78.6133 50.7881C78.6309 50.7913 78.6504 50.7944 78.668 50.7979C78.6484 50.8318 78.6289 50.8682 78.6094 50.9077C78.6289 50.9114 78.6504 50.9148 78.6699 50.9185C78.6504 50.9521 78.6328 50.988 78.6133 51.0271C78.2539 51.6248 77.6582 51.9834 76.9414 51.9834C76.2246 51.9834 75.5078 51.6248 75.2695 51.0271C75.1504 50.9077 75.0312 50.6687 75.0312 50.4297V49.9517V49.7126C75.1504 48.7563 75.9863 47.9197 77.0605 47.9197C77.334 47.9197 77.5918 47.9734 77.8262 48.0696C78.0957 48.2258 78.3262 48.4414 78.5 48.6934C78.6855 48.9612 78.8066 49.2703 78.8477 49.593V49.832V50.2629ZM65.8359 66.5642C65.7207 61.6743 66.623 58.259 67.7734 55.9866C70.373 57.0378 73.5371 57.959 76.7012 57.959C80.0449 57.959 83.2695 57.0029 85.7754 55.9272L85.8711 55.8816L85.8945 55.9272C86.9707 58.3176 87.9258 61.7834 87.9258 66.6836C87.9727 66.6375 88.0195 66.6091 88.0664 66.5847L88.1074 66.564C88.166 66.5339 88.2246 66.5042 88.2832 66.4446C86.8496 72.54 82.3125 79.4719 76.9395 79.4719C72.7617 79.4719 69.0605 75.2888 66.9102 70.5083V70.3887L66.791 70.03C66.3145 68.835 65.9551 67.6399 65.5977 66.4446L65.6758 66.5208C65.7266 66.5642 65.75 66.5642 65.8359 66.5642ZM64.5137 69.6848C64.832 70.0356 65.1035 70.1948 65.2383 70.1497C64.7617 68.9546 64.4023 67.7593 64.1641 66.4446C63.5684 65.7275 63.0898 64.8909 62.6113 63.9348C62.6113 64.6519 62.7324 65.4885 62.9707 66.4446C63.3418 68.0068 63.9902 69.1062 64.5137 69.6848ZM89.209 69.5994C89.7207 69.02 90.3066 67.9775 90.6719 66.4446C90.9102 65.4885 91.0293 64.6519 91.1484 64.0544C90.9355 64.428 90.7227 64.8015 90.498 65.1646C90.2207 65.6143 89.9258 66.0479 89.5957 66.4446C89.2383 67.6399 88.8809 68.9546 88.4023 70.1497C88.5254 70.1497 88.6934 70.071 88.8887 69.9119C88.9902 69.8293 89.0977 69.7253 89.209 69.5994Z"
                  fill="#FFB628"
                  fill-opacity="0.79"
                />
              </svg>

              <span>предьявите распечатанные билеты при посадке</span>
            </div>
          </div>
          <div className="text-info">
            <h4>{`${first_name} ${patronymic}`}!</h4>
            <p>
              Ваш заказ успешно оформлен. В ближайшее время с вами свяжется наш
              оператор для подтверждения.
            </p>
            <p>
              Благодарим Вас за оказанное доверие и желаем приятного
              путешествия!
            </p>
          </div>
        </div>
      </div>
      <div className="order_footer">
        <div className="rating">
          <span>Оцените сервис</span>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <svg
                key={index}
                onClick={() => handleRating(index)}
                width="46"
                height="44"
                viewBox="0 0 46 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M23 3.23607L27.4373 16.8926L27.6618 17.5836H28.3883H42.7477L31.1307 26.0238L30.5429 26.4508L30.7675 27.1418L35.2047 40.7984L23.5878 32.3582L23 31.9311L22.4122 32.3582L10.7953 40.7984L15.2325 27.1418L15.4571 26.4508L14.8693 26.0238L3.25233 17.5836H17.6117H18.3382L18.5627 16.8926L23 3.23607Z"
                  stroke="white"
                  strokeWidth="2"
                  fill={index < rating ? "white" : "none"}
                />
              </svg>
            ))}
        </div>

        <button className="orderPage_btn" onClick={handleGoHome}>
          вернуться на главную
        </button>
      </div>
    </div>
  );
};
