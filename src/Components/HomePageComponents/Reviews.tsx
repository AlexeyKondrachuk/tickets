import reviewImg1 from "../../assets/review1.png";
import reviewImg2 from "../../assets/review2.png";
import "../../styles/reviews.scss";

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <h3 className="reviews-title">отзывы</h3>

      <div className="reviews-items">
        <div className="reviews-item">
          <img
            src={reviewImg1}
            alt="reviewImg1"
            className="reviews-item-image"
          />

          <div className="reviews-item-wrapper">
            <p className="reviews-item-header">Екатерина Вальнова</p>
            <p className="reviews-item-body">
              {" "}
              <q>
                Доброжелательные подсказки на всех этапах помогут правильно
                заполнить поля и без затруднений купить авиа или ж/д билет, даже
                если вы заказываете онлайн билет впервые.
              </q>
            </p>
          </div>
        </div>

        <div className="reviews-item">
          <img
            src={reviewImg2}
            alt="reviewImg2"
            className="reviews-item-image"
          />
          <div className="reviews-item-wrapper">
            <p className="reviews-item-header">Евгений Стрыкало</p>
            <p className="reviews-item-body">
              <q>
                {" "}
                СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за
                3 часа до отправления мы пришлем вам СМС-напоминание о поездке.{" "}
              </q>
            </p>
          </div>
        </div>
      </div>
      <div className="circle-wrapper">
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
      </div>
    </section>
  );
}
