// import  React,{useState} from 'react';

// const AuthContext=React.createContext({
//     token:'',
//     isLoggedIn:false,
//     login:(token)=>{},
//     logout:()=>{},
// })

// export const AuthContextProvider=(props)=>{
//     let logoutTimer;



//     const intialToken=localStorage.getItem('token')
//    const[token,setToken]=useState(intialToken);

//    const userIsLoggedIn=!!token;

//    const setLogoutTimer = (expirationTime) => {
//     setTimeout(() => {
//       logout();
//     }, expirationTime);
//   };
  


// const loggedInHandler=(token)=>{
// setToken(token);
// localStorage.setItem('token',token)

// // setTimeout
// const expirationTime = 300000; // 5 minutes in milliseconds
//   setLogoutTimer(expirationTime);
// }

// const loggedOutHandler=()=>{
// setToken(null);
// localStorage.removeItem('token')

// clearTimeout(logoutTimer);
// }

// const contextValue={
// token:token,
// isLoggedIn:userIsLoggedIn,
// login:loggedInHandler,
// logout:loggedOutHandler,
// }

//     return(
//         <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
//     )
// }
// export default AuthContext;


import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  let logoutTimer;

  const userIsLoggedIn = !!token;

  const loggedInHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    // Set the logout timer for 5 minutes (300,000 milliseconds)
    const expirationTime = 300000; // 5 minutes in milliseconds
    logoutTimer = setTimeout(() => {
      logout();
    }, expirationTime);
  };

  const loggedOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');

    // Clear the logout timer
    clearTimeout(logoutTimer);
  };

  const logout = () => {
    // This function should be defined to clear the timer and perform any other logout actions.
    loggedOutHandler();
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loggedInHandler,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
