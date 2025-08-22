// FILE: /context/SessionContext.js
// DESC: Manages the user's session state (logged-in status, user data).

import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null); // null if logged out, user object if logged in

  const login = (userData) => {
    setSession(userData);
    // In a real app, you'd also store a token in localStorage or cookies
  };

  const logout = () => {
    setSession(null);
    // In a real app, you'd clear the token from storage
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

// Custom hook to easily access the session context
export function useSession() {
  return useContext(SessionContext);
}
