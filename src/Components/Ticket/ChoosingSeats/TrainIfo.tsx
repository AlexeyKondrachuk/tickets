import React from "react";
import { TrainInfoProps } from "../../../Redux/Types/types";

const TrainInfo: React.FC<TrainInfoProps> = ({
  number_train,
  duration,
  dataFrom,
  dataTo,
  city_info_from,
  city_info_to,
  railway_st_from,
  railway_st_to,
  direction,
}) => {
  const station = "вокзал";
  let arrow = "\u2192";
  return (
    <div className="train__info-wrapper">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.461 22.2222C19.7849 22.9136 20.7325 23.152 20.7685 24.0698C16.906 24.0698 13.0914 24.0698 9.22885 24.0698C9.28883 23.1639 10.2125 22.9136 10.5604 22.2342C10.2485 22.1626 9.96058 22.115 9.68468 22.0315C8.31719 21.6143 7.34556 20.3509 7.34556 18.9086C7.32157 15.8334 7.32157 12.782 7.33356 9.71865C7.33356 8.30023 7.99332 7.22747 9.32481 6.76261C10.4044 6.3931 11.556 6.16663 12.6955 6.05935C14.9267 5.85672 17.1699 5.85672 19.377 6.32158C19.9408 6.44078 20.4926 6.64341 20.9964 6.89372C22.076 7.4301 22.6398 8.3479 22.6518 9.52794C22.6758 12.6866 22.6878 15.8453 22.6518 19.004C22.6398 20.4582 21.5602 21.6978 20.1447 22.0554C19.9288 22.1269 19.7009 22.1626 19.461 22.2222ZM14.0151 9.82593C12.4077 9.82593 10.8362 9.82593 9.28883 9.82593C9.28883 11.4231 9.28883 12.9727 9.28883 14.5222C10.8842 14.5222 12.4316 14.5222 14.0151 14.5222C14.0151 12.9488 14.0151 11.4112 14.0151 9.82593ZM20.7325 9.82593C19.1251 9.82593 17.5537 9.82593 16.0063 9.82593C16.0063 11.4231 16.0063 12.9727 16.0063 14.5222C17.6017 14.5222 19.1491 14.5222 20.7325 14.5222C20.7325 12.9488 20.7325 11.4112 20.7325 9.82593ZM12.1198 18.8609C12.1318 18.0742 11.472 17.4187 10.6803 17.4187C9.91259 17.4187 9.26484 18.0385 9.24085 18.8013C9.21686 19.588 9.85262 20.2555 10.6443 20.2794C11.448 20.2913 12.1078 19.6476 12.1198 18.8609ZM20.7565 18.8371C20.7565 18.0504 20.0848 17.4068 19.2931 17.4187C18.5254 17.4306 17.8896 18.0623 17.8776 18.8252C17.8656 19.6119 18.5134 20.2674 19.3051 20.2794C20.1088 20.2794 20.7565 19.6238 20.7565 18.8371Z"
          fill="#FFA800"
        />
        <circle cx="15" cy="15" r="14" stroke="#FFA800" stroke-width="2" />
      </svg>
      <div className="train-direction">
        <h3>{number_train}</h3>
        <div className="directions-wrapper">
          <span className="n_train">{`${city_info_from} ${arrow}`}</span>
          <span className="n_train">{`${city_info_to} ${arrow}`}</span>
        </div>
      </div>
      <div className={`time-info-wrapper-${direction}`}>
        <div className="time-dep">
          <h3>
            {dataFrom?.hours}:{dataFrom?.minutes}
          </h3>
          <div className="directions-wrapper">
            <span>{city_info_from}</span>
            <span>
              {`${railway_st_from} `}
              <span>{station}</span>
            </span>
          </div>
        </div>

        <svg
          width="30"
          height="20"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z"
            fill="#FFA800"
            fill-opacity="0.79"
          />
        </svg>

        <div className="time-dep">
          <h3>
            {dataTo?.hours}:{dataTo?.minutes}
          </h3>
          <div className="directions-wrapper">
            <span>{city_info_to}</span>
            <span>
              {`${railway_st_to} `} <span>{station}</span>
            </span>
          </div>
        </div>
      </div>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.1454 29.9951C7.11437 30.2063 0.215587 23.5269 0.00493763 15.3691C-0.205712 7.13207 6.35076 0.188668 14.4871 0.00386308C22.9131 -0.180942 29.8119 6.28724 29.9962 14.6035C30.1805 22.9989 23.6241 29.8103 15.1454 29.9951ZM27.4421 15.0259C27.4684 8.1881 21.9389 2.59114 15.0664 2.53834C8.29927 2.45913 2.61173 8.0825 2.5854 14.8939C2.53274 21.7845 8.16762 27.4607 14.9874 27.4607C21.8072 27.4607 27.4157 21.8373 27.4421 15.0259Z"
          fill="#FFA800"
        />
        <path
          d="M15.3296 14.3923C17.3571 13.4947 19.1476 12.6762 20.9381 11.8842C21.2278 11.7522 21.5174 11.5146 21.8071 11.541C22.2284 11.5674 22.6233 11.805 23.0446 11.937C22.8603 12.333 22.8077 12.9138 22.4917 13.0722C21.4648 13.6795 20.3589 14.1547 19.3056 14.6563C17.989 15.2899 16.6725 15.9499 15.3559 16.5571C14.171 17.1116 13.5917 16.7684 13.5654 15.5011C13.5391 12.6762 13.5127 9.85136 13.5917 7.02647C13.5917 6.63046 14.1447 6.23445 14.4343 5.83844C14.7503 6.23445 15.3033 6.60406 15.3033 7.00007C15.3822 9.37614 15.3296 11.7522 15.3296 14.3923Z"
          fill="#FFA800"
        />
      </svg>
      <span className="duration">
        {duration?.hours} часов <br />
        {duration?.minutes} минуты
      </span>
    </div>
  );
};

export default TrainInfo;
