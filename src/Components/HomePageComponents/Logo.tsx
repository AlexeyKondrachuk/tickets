import { Link } from "react-router-dom";
import "../../styles/logo.scss";

export default function Logo() {
  return (
    <div className="logo-container">
      <Link to={"/"} className="logo">
        <p>Лого</p>
      </Link>
    </div>
  );
}
