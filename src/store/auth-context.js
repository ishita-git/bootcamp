import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout : ()=>{},
    onLogin : (name,email , password,age,gender)=> {
    
   
    },
    onSignin: (username , password) =>{}
});

export const AuthContextProvider = (props)=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('isLoggedIn');
        if(storedUser === '1')
        {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = ()=> {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }
    const loginHandler =(email, password, name,age,gender) => {
        localStorage.setItem('isLoggedIn','1');
        // setIsLoggedIn(true);
        console.log(email, name)
    }
    const signinHandler = (username , password) =>{
      localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
        console.log(username,password)
    }
    return(
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn , onLogout: logoutHandler , onLogin : loginHandler , onSignin:signinHandler}}>
          {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;