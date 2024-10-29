import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  
  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (token) {
        const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token);
        const data = await response.json();
        
        
        if (data.error) {
          console.log('Token expired or invalid. Logging out.');
          logout();
        }
      }
    };

   
    const intervalId = setInterval(checkTokenExpiration, 3600000);
    checkTokenExpiration();

  
    return () => clearInterval(intervalId);
  }, [token]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
