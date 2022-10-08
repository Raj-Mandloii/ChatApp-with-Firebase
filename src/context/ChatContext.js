
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
const {currentUser} = useContext(AuthContext)
    const initialState = {
        chatId: "",
        user: {}
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER": return {
                user: action.payload,
                chatId: currentUser.uid > user.uid
                    ? currentUser.uid + user.uid
                    : action.payload.uid + currentUser.uid

            }
            default: return state;
        }
    }
const [state,dispatch] = useReducer(chatReducer,initialState)
    return (
        <ChatContext.Provider value={{ data:state,dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}