import { useState } from "react";
import EditProfileForm from "../components/EditForm/EditProfileForm";
import UserProfileDetails from "../components/UserProfileDetails/UserProfileDetails";



const ProfilePage = () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(true);
    const [updateProfileError, setUpdateProfileError] = useState(null);

    const handleEditButtonClick = () => {
        setShowEditForm(true);
        setShowUserProfile(false);
        
    };

    const handleCancelButtonClick = () => {
        setShowEditForm(false);
        setUpdateProfileError(null); 
        setShowUserProfile(true);
    };

    const handleUpdateProfile = async ( userId, formData) => {
        console.log('userid de handleprofile : ', userId)
        const token = localStorage.getItem('token'); 
        console.log('datitaa', formData.get('name'));
        console.log('token de handleprofile :', token)
        const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;

        let errorData = {};

        try {
            const response = await fetch(`${urlRaiz}/user/${userId}/editProfile`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
            },
            body: formData,
            });
            console.log('formData enviado en la solicitud:', formData);

            if (response.ok) {
            
            const data = await response.json();

            console.log('newToken', data.newToken);
            if (data.newToken) {
                localStorage.setItem('token', data.newToken);
            }
            console.log('DATA RESPONSE DANI', data);
            console.log("Perfil actualizado con éxito");
            setShowEditForm(false);
            setShowUserProfile(true);
            setUpdateProfileError(null); 
            } else {
            try {
                const responseData = await response.text();
                console.log("Respuesta del servidor:", responseData);
                errorData = responseData ? JSON.parse(responseData) : {};
                console.log('ErrorData profilepage : ', errorData);
                throw new Error(errorData.message || "Error al actualizar el perfil");
            } catch (error) {
                console.error("Error al analizar la respuesta JSON:", error);
                throw new Error("Error al actualizar el perfil");
            }
            }
        } catch (error) {
            console.error("Error de red:", error);
            if (error instanceof Response && error.status === 422) {
                const errorData = await error.response.json();
                setUpdateProfileError(errorData.errors);
            } else {
                setUpdateProfileError(
                    errorData.message
                );
            }
        }
        };

        console.log('Rendering ProfilePage:', showEditForm, showUserProfile);


        return (
            <>
    
                {showEditForm && (
                    <EditProfileForm
                        onUpdateProfile={handleUpdateProfile}
                        onCancelEditProfile={handleCancelButtonClick}
                        errors={updateProfileError}
                    />
                )}
    
                {showUserProfile && !showEditForm && (
                    <UserProfileDetails
                    onEditProfileClick={() => handleEditButtonClick()}
                />
                )}
            </>
        );
    }


export default ProfilePage;