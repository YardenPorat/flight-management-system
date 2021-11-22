import React, { useState } from 'react';
import { dbAuthProvider } from './db-auth-provider';

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = async (userData) => {
    const userId = await dbAuthProvider.signIn(userData);
    setUser(userId);
    return userId;
  };

  const signOut = async () => {
    await dbAuthProvider.signOut();
    setUser(null);
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}