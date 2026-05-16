import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setIsLoadingAuth(false));
  }, []);

  const logout = () => {
    base44.auth.logout('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  return context;
};