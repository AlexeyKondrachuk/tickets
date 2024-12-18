import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/footer/Footer";
import HomePageHeader from "../Components/HomePageComponents/HomePageHeader";
import HeaderStepsPages from "../Components/HeaderStepsPages/HeaderStepsPages";
import { useAppSelector } from "../hooks/redux";
import isLoadingImage from "../assets/isLoading_animate.gif";

export default function MainLayout() {
  const location = useLocation();
  const { isLoading } = useAppSelector((state) => state.isStatusQwery);

  return (
    <>
      {location.pathname !== "/" ? <HeaderStepsPages /> : <HomePageHeader />}
      <main className="main-container">
        {isLoading ? (
          <div className="isLoading-containter">
            <img
              className="isLoading-container-img"
              src={isLoadingImage}
              alt="Loading"
            />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </>
  );
}
