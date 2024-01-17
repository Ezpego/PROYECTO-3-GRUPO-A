import './App.css';
import {Routes, Route} from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage.jsx';
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from './pages/LoginPage.jsx';
import ForgottenPage from './pages/ForgottenPage.jsx';


function App() {
  return (
    <main>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/users/register" element={<RegisterPage />}/>
          <Route path="/users/login" element={<LoginPage />}/>
          <Route path="/users/forgottenPassword" element={<ForgottenPage />}/>
          {/* <Route path="/users/reactivate_account" element={<ReactivationPage />}/> */}
          {/* <Route path="/user/:userId/editProfile" element={<EditProfilePage />}/> */}
          {/* <Route path="/user/:userId/disableProfile" element={<DisableProfilePage />}/> */}
          {/* <Route path="/user/:userId/deleteProfile" element={<DeleteProfilePage />}/> */}
          {/* <Route path="/exercises" element={<CreateExercisePage />}/> */}
          {/* <Route path="/exercises/:id" element={<EditExerxisePage />}/> */}
          {/* <Route path="/exercises/:id" element={<DeleteExercisePage />}/> */}
          {/* <Route path="/exercises/" element={<GetExercisesPage />}/> */}
          {/* <Route path="/exercises/:id" element={<GetExercisePage />}/> */}
          {/* <Route path="/exercises/:id/likes" element={<LikesPage />}/> */}
          {/* <Route path="/exercises/:id/favourites" element={<FavouritesPage />}/> */}
          {/* <Route path="/filter" element={<FilterPage />}/> */}
          {/* <Route path="/favourites" element={<FavouritePage />}/> */}
        </Routes>
      <Footer />

    </main>
  );
}

export default App;
