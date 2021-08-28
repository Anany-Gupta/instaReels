import React, { useState, useEffect } from "react";
import { firebaseAuth } from "./config/firebase";
export const AuthContext = React.createContext();

export  let AuthProvider = ({ children }) =>{
  const [currentUser, setCurrentUser] = useState(null);

  let login=(email, password) =>{
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  let signOut=() => {
    return firebaseAuth.signOut();
  }

  let  signUp = (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email , password);
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log("Inside auth state changed !!", user);
      setCurrentUser(user);
    });
  }, []);

  let value = {
    currentUser: currentUser,
    signOut: signOut,
    login: login,
    signUp: signUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}