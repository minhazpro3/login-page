import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,createUserWithEmailAndPassword,updateProfile ,signInWithEmailAndPassword ,signOut } from "firebase/auth";
import initializeFirebaseApp from "./firebase.init";
import { useEffect, useState } from "react";

initializeFirebaseApp()
const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState({})
    const [error, setError]=useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const googleSignIn = () => {
      return  signInWithPopup(auth, googleProvider)
          
    }

    const createUserEmailPassword = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginEmailAndPassword = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update name
    const updateName = (name)=>{
        console.log(name)
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            window.location.reload()
          }).catch((error) => {
           if(error){
               setError(false)
           }
          });
          
    }

    // logOut
    const logOut = ()=>{
        signOut(auth)
        .then(() => {

          }).catch((error) => {
           
          });
    }

    // onAuth state catch
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        })
        return () => unsubscribe();
    }, [user?.displayName])
    return {
        googleSignIn,
        user,
        setUser,
        createUserEmailPassword,
        updateName,
        loginEmailAndPassword,
        isLoading,
        setError,
        error,
        logOut
    }
};

export default useFirebase;