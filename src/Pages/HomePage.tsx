import { useLocation } from "react-router-dom";
import AboutUs from "../Components/HomePageComponents/AboutUs";
import HowItWorks from "../Components/HomePageComponents/HowItWorks";
import Reviews from "../Components/HomePageComponents/Reviews";
import { useEffect } from "react";
import "../styles/homepage.scss";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 190);
    }
    if (!location.hash) {
      window.scrollTo(0, 0); // Скроллит страницу наверх, если нет хэша
    }
  }, [location]);

  return (
    <div className="header-container">
      <AboutUs />
      <HowItWorks />
      <Reviews />
    </div>
  );
}
