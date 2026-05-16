import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const FirebaseAuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loadingFirebaseAuth, setLoadingFirebaseAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoadingFirebaseAuth(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  return (
    <FirebaseAuthContext.Provider value={{
      user: firebaseUser,
      isAuthenticated: !!firebaseUser,
      loadingFirebaseAuth,
      logout,
    }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  return context;
};