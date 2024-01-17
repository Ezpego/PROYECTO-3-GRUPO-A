import { Routes, Route } from 'react-router-dom';

import ForgottenPage from './pages/ForgottenPage'
import HomePage from './pages/HomePage.jsx'
import ReactivatePage from './pages/ReactivatePage'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/users/register" element={<RegisterPage/>} />
      <Route path="/users/forgottenPassword" element={<ForgottenPage/>} />
      <Route path="/users/reactivate_account" element={<ReactivatePage/>} />
    </Routes>
    </>
  )
}

export default App
