import { useState, useContext} from 'react';
import { RxAvatar, RxExit } from "react-icons/rx";
import TokenContext from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";


const ProfileIcon = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {userData, error, clearError, tokenUpdate} = useContext(TokenContext);
  const navigate = useNavigate();
  console.log('user:', userData)

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    clearError();
  };

  const handleExitButton = () => {
    tokenUpdate("");
    navigate('/');
  };

  const handleViewProfileDetails = () => {
    handleMenuOpen();
    navigate('/user/:userId/editProfile');  
  }

  return (
    <div className="">
      <div className="profile-icon" onClick={handleMenuOpen}>
        {userData && userData.profile_image_url ? (
          <img
            src={userData.profile_image_url}
            alt="Profile"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        ) : (
          <RxAvatar />
        )}
      </div>

      {menuOpen && (
        <div className="menu">
          <a href="#" onClick={handleViewProfileDetails}>Mi perfil</a>
          <RxExit onClick={handleExitButton} />
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="menu-icon" onClick={handleMenuOpen}>
      </div>
    </div>
  );
};

export default ProfileIcon;
