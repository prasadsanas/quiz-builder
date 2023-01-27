import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../../src/config/firebase";
import { collection, addDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    auth.signOut();
  }

  async function saveUser(payload) {
    try {
      const subAdmin = await addDoc(collection(db, "SubAdmin"), {
        Name: payload.Name,
        Email: payload.Email,
        Mobile: payload.Mobile,
        Password: payload.Password,
      });
      return subAdmin.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    saveUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
