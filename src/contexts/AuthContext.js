import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setloading] = useState(true);
  const [currentUser, setcurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      setloading(false);
    });

    return unsubcribe;
  }, []);
  //signUp function
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    const user = auth.currentUser;

    setcurrentUser({
      ...user,
    });
  }

  //login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout function
  function logout(params) {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
