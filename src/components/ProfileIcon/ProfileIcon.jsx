// import { useState, useContext} from 'react';
// import { RxAvatar, RxExit } from "react-icons/rx";
// import TokenContext from "../../context/TokenContext";
// import { useNavigate } from "react-router-dom";
// import './ProfileIcon.css'; 


// const ProfileIcon = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const {userData, error, clearError, tokenUpdate} = useContext(TokenContext);
//   const navigate = useNavigate();
//   console.log('user:', userData)

//   const handleMenuOpen = () => {
//     setMenuOpen(!menuOpen);
//     clearError();
//   };

//   const handleExitButton = () => {
//     tokenUpdate("");
//     navigate('/');
//   };

//   const handleViewProfileDetails = () => {
//     handleMenuOpen();
//     navigate('/user/:userId/editProfile');  
//   }

//   const handleCloseModal = () => {
//     setMenuOpen(false);
//   };


//   return (
//     <div className="">
//       <div className="profile-icon" onClick={handleMenuOpen}>
//         {userData && userData.profile_image_url ? (
//           <img
//           key={userData.profile_image_url}
//           src={userData.profile_image_url}
//           alt="Profile"
//           style={{ width: '40px', height: '40px', borderRadius: '50%' }}
// />
//         ) : (
//           <RxAvatar />
//         )}
//       </div>

//       {menuOpen && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal">
//             <a href="#" onClick={handleViewProfileDetails}>Mi perfil</a>
//             <RxExit onClick={handleExitButton} />
//           </div>
//         </div>
//       )}

//       {error && <div className="error-message">{error}</div>}

//       <div className="menu-icon" onClick={handleMenuOpen}>
//       </div>
//     </div>
//   );
// };

// export default ProfileIcon;

import { useContext, useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { RxExit } from 'react-icons/rx';
import TokenContext from '../../context/TokenContext';
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const { userData, error, clearError, tokenUpdate } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
    clearError();
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const handleExitButton = () => {
    tokenUpdate('');
    navigate('/');
    handleMenuClose();
  };

  const handleViewProfileDetails = () => {
    navigate('/user/:userId/editProfile');
    handleMenuClose();
  };

  return (
    <div>
      <Avatar
        onClick={handleMenuOpen}
        alt="Profile"
        src={userData?.profile_image_url}
        sx={{ width: 25, height: 25, cursor: 'pointer' }}
      />

      <Menu
        anchorEl={menuOpen}
        open={Boolean(menuOpen)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen
            ? 'scale(1) translateY(0)'
            : 'scale(0.8) translateY(-10px)', 
          transition: 'opacity 0.9s ease-out, transform 0.9s ease-out',
        }}
      >
        <MenuItem 
        onClick={handleViewProfileDetails}
        sx={{
          padding: '12px 20px',
          color: '#2962ff',
          '&:hover': {
            backgroundColor: 'rgba(41, 98, 255, 0.1)',
          },
        }}
        >
          Mi perfil</MenuItem>
        <MenuItem 
        onClick={handleExitButton}
        sx={{
          padding: '12px 20px',
          color: '#2962ff',
          '&:hover': {
            backgroundColor: 'rgba(41, 98, 255, 0.1)',
          },
        }}
        >
          <RxExit style={{ marginRight: '8px' }}/>  Salir
        </MenuItem>
      </Menu>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ProfileIcon;

