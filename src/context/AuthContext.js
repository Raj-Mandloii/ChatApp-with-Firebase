import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"
import { createContext, useEffect, useState } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentuser, setCurrentUser] = useState({});

    useEffect(() => {
        const clean = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        });
        return () => {
            clear()
        }
    }, []);
    <AuthContext.Provider value={{ currentuser }}>
        {children}
    </AuthContext.Provider>
}