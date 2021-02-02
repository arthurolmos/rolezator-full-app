import React from "react";
import firebase from "firebase";
import { User } from "../models";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const db = firebase.firestore();
  const auth = firebase.auth();
  auth.useDeviceLanguage();

  const [user, setUser] = React.useState(null);
  const [userSuggestions, setUserSuggestions] = React.useState([]);
  const [userBlacklist, setUserBlacklist] = React.useState([]);

  const blacklistUnsubscribe = React.useRef();
  const suggestionsUnsubscribe = React.useRef();

  React.useEffect(() => {
    function addListener(uid, collection, setter) {
      return db
        .collection("users")
        .doc(uid)
        .collection(collection)
        .onSnapshot((collection) => {
          const docs = [];

          collection.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            docs.push(data);
          });

          setter(docs);
        });
    }

    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = user.uid;

        if (!user.admin) {
          auth.currentUser
            .getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
              const fUser = new User(
                uid,
                user.displayName,
                user.email,
                idToken
              );

              // console.log(fUser);

              setUser(fUser);
            })
            .catch(function (error) {
              // Handle error
              console.log("ERROR", error);
            });

          blacklistUnsubscribe.current = addListener(
            uid,
            "blacklist",
            setUserBlacklist
          );
          suggestionsUnsubscribe.current = addListener(
            uid,
            "suggestions",
            setUserSuggestions
          );
        }
      } else {
        blacklistUnsubscribe.current && blacklistUnsubscribe.current();
        suggestionsUnsubscribe.current && suggestionsUnsubscribe.current();

        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  async function signIn() {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();

      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.log("ERROR ON SIGNIN", error);
    }
  }

  function signOut() {
    auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        signIn,
        signOut,

        userSuggestions,
        userBlacklist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
