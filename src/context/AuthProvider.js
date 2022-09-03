import { createContext } from "react";
import { useState } from "react";

const AuthContext=createContext({});

export const AuthProider=({ children })=>{
    const [auth,setAuth]=useState({});

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;