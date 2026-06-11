import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const stored = localStorage.getItem('user');
  const token  = localStorage.getItem('token');
  if (stored && token) {
    // Check token expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 > Date.now()) {
        setUser(JSON.parse(stored));
      } else {
        // Token expired — clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  setLoading(false);
}, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password, gender) => {
  const res = await api.post('/auth/register', { name, email, password, gender });
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  setUser(res.data.user);
  return res.data;
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);