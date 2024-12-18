import "../../styles/aboutus.scss";

export default function AboutUs() {
  return (
    <section className="aboutus" id="aboutUs">
      <span className="line-h"></span>

      <h2 className="aboutus-title">о нас</h2>

      <div className="aboutus-wrapper">
        <div>
          <span className="line-v"></span>
        </div>

        <div>
          <p className="aboutus-discription">
            Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы
            наблюдаем, как с каждым днем <br /> все больше людей заказывают жд
            билеты через интернет.
          </p>

          <p className="aboutus-discription">
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2
            клика, но стоит ли это делать? <br />
            Мы расскажем о преимуществах заказа через интернет.
          </p>

          <p className="aboutus-discription">
            Покупать жд билеты дешево можно за 90 суток до отправления поезда.{" "}
            <br />
            Благодаря динамическому ценообразованию цена на билеты в это время
            самая низкая.
          </p>
        </div>
      </div>
    </section>
  );
}
