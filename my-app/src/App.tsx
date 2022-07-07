import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { useMoralis } from "react-moralis";

import { NavLink, Link } from "react-router-dom";
import {
  Button,
  AppShell,
  Navbar,
  Header,
  Burger,
  MediaQuery,
  Text,
  useMantineTheme
} from "@mantine/core";
import { UserCircle, Login as LoginImg, Logout, BoxMargin } from "tabler-icons-react";

import Landing from "./Pages/Landing";
import ProfileLanding from "./Pages/ProfileLanding";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const {
    authenticate,
    isAuthenticated,
    isInitialized,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  //Runs everytime isAuthenticated is changed (and init)
  useEffect(() => {
    if (isAuthenticated) {
      //Logic here
    }
  }, [isAuthenticated]);

  if (isInitialized) {
    return (
      <div>
{/*         
      <AppShell
        header={
          <Header height={90} sx={(theme) => ({backgroundColor: theme.colors.grayWhite[0]})}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}
            >
              <div style={{ marginLeft: 72}}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <NavLink to="/">
                <Text weight={700} size="xl" sx={{fontSize: 30, fontFamily: 'Greycliff CF, sans-serif'}}>LINKUS.ETH</Text>
              </NavLink>

              </div>
              
              <div>
                {isAuthenticated && (
                  <NavLink to="Settings">
                    <Button
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      leftIcon={<UserCircle />}
                      sx={{ marginRight: 12}}
                    >
                      Profile
                    </Button>
                  </NavLink>
                )}
                {isAuthenticated ? (
                  <Button
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    onClick={logOut}
                    leftIcon={<Logout />}
                    sx={{ marginRight: 102}}
                    >
                      Logout
                      </Button>
                ) : (
                  <Button
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    onClick={login}
                    leftIcon={<LoginImg />}
                    sx={{ marginRight: 102}}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </Header>
        }
      >
      </AppShell> */}

      <div style={{}}>
      <Routes >
            <Route path="/" element={<Landing />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/u/:urlSlug" element={<ProfileLanding />} />
          </Routes>
      </div>
    </div>
         
    );
  } else {
    return <h1>Moralis not initialized</h1>;
  }
}

export default App;
