import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "summarist-4e7a3.firebaseapp.com",
  projectId: "summarist-4e7a3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);