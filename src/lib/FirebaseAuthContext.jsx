// Firebase auth not in use - reverted to Base44 auth
export const FirebaseAuthProvider = ({ children }) => children;
export const useFirebaseAuth = () => ({ user: null, isAuthenticated: false, loadingFirebaseAuth: false, logout: () => {} });