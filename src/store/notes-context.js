import React,{createContext,useState} from "react";
export const NotesContext = createContext();

export const NotesContextProvider = ({children})=>{
    const [notes,setNotes]= useState([]);

    return(
     <NotesContext.Provider value={{notes,setNotes}}>
     {children}
     </NotesContext.Provider>
    )
};