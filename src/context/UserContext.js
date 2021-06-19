import React, { useState, useEffect } from 'react';
import { firebaseAuth } from '../firebase/firebase';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
