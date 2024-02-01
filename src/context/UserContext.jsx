import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const handleUser = (userData) => {
		setUser(userData);
	};

	const handleError = (errorMessage) => {
		setError(errorMessage);
		};
	
	const clearError = () => {
		setError(null);
		};

	const updateUser = (newUserData) => {
		setUser((prevUser) => ({
		...prevUser,
		...newUserData,
		}));
	};
	
		const data = { user, error, handleUser, handleError, clearError, updateUser };

	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default UserContext;

