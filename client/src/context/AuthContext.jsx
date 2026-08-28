import { createContext, useContext, useState, useEffect } from 'react';
import request from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  async function login(email,password){
    const data = await request('/auth/login',{
      method:'POST',
      body:JSON.stringify({email, password}),
    });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  }
  async function register(name,email,password){
    const data = await request('/auth/register',{
      method:'POST',
      body: JSON.stringify({name,email,password}),
    });
    localStorage.setItem('token',data.token);
    setToken(data.token);
    setUser(data.user);
  }

  function logout(){
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }
  
    useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    request('/auth/me')
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);
