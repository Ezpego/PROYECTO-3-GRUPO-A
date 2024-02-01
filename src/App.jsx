import "./App.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ForgottenPage from "./pages/ForgottenPage";
import HomePage from "./pages/HomePage.jsx";
import ReactivatePage from "./pages/ReactivatePage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer/Footer";

function App() {
  // !Intento de pasar como props una función a la ruta, no funciona.
  // const [emailValue, setEmailValue] = useState('');

  // function handleEmailChange (value) {
  //     console.log(typeof value);
  //     setEmailValue(value);
  //   }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/forgottenPassword" element={<ForgottenPage />} />
        <Route path="/users/reactivate_account" element={<ReactivatePage />} />
        <Route path="/exercises/:id" element={<AdminPage />} />
        <Route path="/user/:userId/editProfile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
