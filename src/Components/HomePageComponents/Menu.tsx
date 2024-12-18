import { NavLink } from "react-router-dom";
import "../../styles/menu.scss";

export default function Menu() {
  return (
    <div className="menu-container">
      <NavLink to="/#aboutUs" className="menu_item">
        О нас
      </NavLink>
      <NavLink to="/#howitwork" className="menu_item">
        Как это работает
      </NavLink>
      <NavLink to="/#reviews" className="menu_item">
        Отзывы
      </NavLink>
      <NavLink to="/#contacts" className="menu_item">
        Контакты
      </NavLink>
    </div>
  );
}
