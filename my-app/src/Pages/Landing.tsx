import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import {
  Button,
  AppShell,
  Navbar,
  Header,
  Burger,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  UserCircle,
  Login as LoginImg,
  Logout,
  BoxMargin,
} from "tabler-icons-react";

export default function Landing() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { authenticate, isAuthenticated, logout } = useMoralis();

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

  return (
    // sx={(theme) => ({backgroundColor: theme.colors.grayWhite[0]})
    <div>
      <h1>Hello</h1>
      {isAuthenticated && (
        <NavLink to="Settings">
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            leftIcon={<UserCircle />}
            sx={{ marginRight: 12 }}
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
          sx={{ marginRight: 102 }}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={login}
          leftIcon={<LoginImg />}
          sx={{ marginRight: 102 }}
        >
          Login
        </Button>
      )}
    </div>
  );
}
