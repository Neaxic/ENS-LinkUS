import React, {useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis";

import Landing  from './Pages/Landing'
import ProfileLanding  from './Pages/ProfileLanding'

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  //let name: string = 'd'; eller let name: any = 'd';

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

        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/profile" element={<h1>To</h1>} />
          <Route path="/u/:slug" element={<ProfileLanding/>} />
        </Routes>

      </header>
    </div>
  );
}

export default App;
