import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../../src/config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

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

  async function deleteQuiz(perma) {
    await deleteDoc(doc(db, "Quiz", perma));
    await deleteDoc(doc(db, currentUser.email, perma));
  }

  async function saveQuiz(payload) {
    try {
      await setDoc(doc(db, currentUser.email, payload.permalinks), {
        permalinks: payload.permalinks,
        title: payload.title,
        questions: payload.questions,
        email: currentUser.email,
        uid: currentUser.uid,
      });
      saveAllQuiz(payload);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function saveAllQuiz(payload) {
    try {
      await setDoc(doc(db, "Quiz", payload.permalinks), {
        permalinks: payload.permalinks,
        title: payload.title,
        questions: payload.questions,
        email: currentUser.email,
        uid: currentUser.uid,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getAllQuiz() {
    const quizRef = collection(db, currentUser.email);
    const docsSnap = await getDocs(quizRef);
    let result = [];
    docsSnap.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }

  async function getAllQuizAnonymous() {
    const quizRef = collection(db, "Quiz");
    const docsSnap = await getDocs(quizRef);
    let result = [];
    docsSnap.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }

  async function getSpecificQuiz(perma) {
    const quizRef = collection(db, "Quiz");
    const docsSnap = await getDocs(quizRef);
    let result = [];
    docsSnap.forEach((doc) => {
      if (doc.data().permalinks === perma) {
        result.push(doc.data());
      }
    });
    return result;
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
    saveQuiz,
    getAllQuiz,
    getSpecificQuiz,
    deleteQuiz,
    getAllQuizAnonymous,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
