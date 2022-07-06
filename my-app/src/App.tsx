import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis";


function App() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  //Runs everytime isAuthenticated is changed (and init)
  useEffect(() => {
    if(isAuthenticated){
      //Logic here
    }

  }, [isAuthenticated]);


  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }


  //Sick if statmentes in rendering code
  //https://reactjs.org/docs/conditional-rendering.html
  
  return (
    <div className="App">
      <header className="App-header">
        {!isAuthenticated ?
          <button onClick={login}>Moralis Metamask Login</button> :
          <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
        }
      
      </header>
    </div>
  );
}

export default App;
