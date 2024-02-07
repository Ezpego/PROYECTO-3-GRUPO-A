import "./App.css";

import { Routes, Route } from "react-router-dom";
// import { UserProvider } from './context/UserContext.jsx';

import ForgottenPage from "./pages/ForgottenPage";
import HomePage from "./pages/HomePage.jsx";
import ReactivatePage from "./pages/ReactivatePage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div id="main-content">
      {/* <UserProvider>   */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/forgottenPassword" element={<ForgottenPage />} />
        <Route path="/users/reactivate_account" element={<ReactivatePage />} />
        <Route path="/exercises/" element={<AdminPage />} />
        <Route path="/user/:userId/editProfile" element={<ProfilePage />} />
      </Routes>
      <Footer />
      {/* </UserProvider>   */}
    </div>
  );
}

export default App;
