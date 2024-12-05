// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { fireAuth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  uid: string | null;
  email: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  uid: null,
  email: null,
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(localStorage.getItem("uid"));
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
      if (user) {
        setUid(user.uid);
        setEmail(user.email);
        localStorage.setItem("uid", user.uid);
      } else {
        setUid(null);
        setEmail(null);
        localStorage.removeItem("uid");
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    fireAuth.signOut().then(() => {
      setUid(null);
      setEmail(null);
      localStorage.removeItem("uid");
    });
  };

  return (
    <AuthContext.Provider value={{ uid, email, isAuthenticated: !!uid, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
