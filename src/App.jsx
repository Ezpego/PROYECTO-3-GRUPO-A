import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
// import { UserProvider } from './context/UserContext.jsx';

import ForgottenPage from "./pages/ForgottenPage";
import HomePage from "./pages/HomePage.jsx";
import ReactivatePage from "./pages/ReactivatePage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import FormExercisesEditer from "./components/ExercisesForm/ExercisesFormEditer.jsx";

function App() {
  const navigate = useNavigate();

  const handleGymJoyHeadder = () => {
    navigate("/");
  };
  return (
    <>
      <header>
        <h1 onClick={handleGymJoyHeadder}>GymJoy</h1>
      </header>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/forgottenPassword" element={<ForgottenPage />} />
          <Route
            path="/users/reactivate_account"
            element={<ReactivatePage />}
          />
          <Route path="/exercises/" element={<AdminPage />} />
          <Route path="/user/:userId/editProfile" element={<ProfilePage />} />
          <Route path="/exercises/edited" element={<FormExercisesEditer />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
