import { Route, Routes } from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import HomePage from "./Pages/HomePage";
import TicketsPage from "./Pages/TicketsPage";
import { Ticket } from "./Components/Ticket/Ticket";
import { Passengers } from "./Pages/Passengers";
import { PaymentPage } from "./Pages/PaymentPage";
import { CheckPage } from "./Pages/CheckPage";
import { OrderPage } from "./Pages/OrderPage";

import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />} />

          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/:id" element={<Ticket />} />
          <Route path="tickets/:id/passengers" element={<Passengers />} />
          <Route
            path="tickets/:id/passengers/payment"
            element={<PaymentPage />}
          />
          <Route
            path="tickets/:id/passengers/payment/check"
            element={<CheckPage />}
          />
          <Route
            path="tickets/:id/passengers/payment/check/order"
            element={<OrderPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
