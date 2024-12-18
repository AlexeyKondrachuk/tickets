import { Link } from "react-router-dom";
import { socials, contacts } from "./contacts_socials";
import Logo from "../HomePageComponents/Logo";
import { useSubscribeMutation } from "../../Redux/fetchApi/ApiCity";
import { useState } from "react";
import { MessageInfo } from "../messageTooltip/MessageInfo";
import "../../styles/footer.scss";

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [subscribe, { isLoading}] = useSubscribeMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Поле email не может быть пустым.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Введите корректный email. Пример privet@yandex.ru");
      return;
    }

    try {
      await subscribe({ email }).unwrap();
      console.log("Подписка успешно оформлена!");
      setErrorMessage("Подписка успешно оформлена!");
    } catch (error) {
      setErrorMessage("Ошибка при оформлении подписки. Попробуйте еще раз");
      console.error("Ошибка при оформлении подписки:", error);
    }
  };

  const handlerClose = () => {
    setErrorMessage(null);
  };

  return (
    <footer className="footer" id="contacts">
      {errorMessage !== null && (
        <MessageInfo
          onClose={handlerClose}
          message={errorMessage}
          type="info"
        />
      )}
      <div className="contacts_socials-wrapper">
        <div className="contacts">
          <h3 className="contact-title">Свяжитесь с нами</h3>
          <div className="contacts-items">
            {contacts.map((item) => (
              <div key={item.id} className="contact-item">
                {item.img}
                <h4 className="contact-item-title">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="subscribe">
          <h3 className="subscribe-title">Подписка</h3>
          <form className="subscribe-container" onSubmit={handleSubmit}>
            <label htmlFor="subscribe" className="subscribe-label">
              {" "}
              Буть в курсе событий
            </label>
            <div className="input-subscribe-wrapper">
              <input
                type="text"
                id="subscribe"
                className="input-subscribe"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="btn-subscribe"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "выполняется" : "отправить"}
              </button>
            </div>
          </form>

          <div className="social">
            <h3 className="social-icon-title">Подписывайтесь на нас</h3>
            <div className="social-icons-wrapper">
              {socials.map((item) => (
                <Link to="" key={item.id}>
                  {item.img}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="line"></span>
      <div className="footer-logo_section">
        <div className="footer-logo_section">
          <Logo />
          <button onClick={scrollToTop} className="scroll">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="17.5" stroke="#E5E5E5" />
              <path
                d="M18.3 16.7569C19.9256 18.3882 21.4531 19.9325 22.9667 21.4552C23.3758 21.8668 24.0742 21.835 24.4853 21.4256C24.8978 21.0149 24.8646 20.3803 24.4521 19.9696C22.6174 18.1427 20.7773 16.3107 18.9612 14.5024C18.571 14.114 17.9403 14.1139 17.5503 14.5026C15.8016 16.2458 13.9963 18.0515 12.1839 19.8493C11.7543 20.2753 11.7195 20.9344 12.1606 21.3485C12.579 21.7412 13.272 21.7659 13.6799 21.3622C15.1455 19.912 16.6793 18.383 18.3 16.7569Z"
                fill="#E5E5E5"
              />
            </svg>
          </button>
          <h4 className="footer-logo_section_title">2018 WEB</h4>
        </div>
      </div>
    </footer>
  );
}
