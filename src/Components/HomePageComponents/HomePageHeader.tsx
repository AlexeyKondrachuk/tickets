import HeaderImg from "../../assets/HeaderImg.png";
import FormSearch from "./FormSearch";
import Logo from "./Logo";
import Menu from "./Menu";

import "../../styles/HomePageHeader.scss";

export default function HomePageHeader() {
  return (
    <header className="header-wrapper">
      <Logo />
      <Menu />
      <h1 className="title">
        Вся жизнь - <br />
        <span>путешествие!</span>
      </h1>

      <img className="image_header" src={HeaderImg} alt="Header Image" />
      <FormSearch />
    </header>
  );
}
