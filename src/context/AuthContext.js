import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const authContext = createContext();

// Create a MyProvider component to wrap the content that needs access to the context value
const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState(null);


    

    const login = () => {
      setIsAuth(true);
    };
  
    const logout = () => {
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        setIsAuth(false);
    };
  
    const authContextValue = {
      isAuth,
      login,
      logout,
      userId
    };
  
    return (
      <authContext.Provider value={authContextValue}>
        {children}
      </authContext.Provider>
    );
  };

  const useAuthContext = () => {
    const context = useContext(authContext);
    if (context === undefined) {
      throw new Error('useAuthContext must be used within a ContextProvider');
    }
    return context;
  };

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export { AuthProvider, useAuthContext };