import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    base44.auth.isAuthenticated()
      .then(async (authed) => {
        if (authed) {
          const u = await base44.auth.me();
          setUser(u);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoadingAuth(false));
  }, []);

  const logout = () => {
    base44.auth.logout('/');
  };

  const refreshUser = async () => {
    try {
      const authed = await base44.auth.isAuthenticated();
      if (authed) {
        const u = await base44.auth.me();
        setUser(u);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  return context;
};