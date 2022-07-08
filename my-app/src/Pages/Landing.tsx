import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import {
  Button,
  AppShell,
  Navbar,
  Header,
  Blockquote,
  Burger,
  Timeline,
  MediaQuery,
  Text,
  useMantineTheme,
  Grid,
} from "@mantine/core";
import {
  UserCircle,
  Login as LoginImg,
  Logout,
  BoxMargin,
  GitBranch,
  GitPullRequest,
  GitCommit,
  MessageDots,
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

      <Grid grow>
        <Grid.Col span={4}>
          <Blockquote cite="– The developer">
            Why dosent there exsist a web3 social tree platfrom lol?
          </Blockquote>
        </Grid.Col>
        <Grid.Col span={4}>
          <Timeline active={0} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<GitBranch size={12} />} title="Working basics">
              <Text color="dimmed" size="sm">
                A bare bones, good looking basic issue of the platform, not considering security, nor optimizations
              </Text>
              <Text size="xs" mt={4}>
                2 hours ago
              </Text>
            </Timeline.Item>

            <Timeline.Item bullet={<GitCommit size={12} />} title="Mobile platform">
              <Text color="dimmed" size="sm">
                Fixing the mobile version of the app
              </Text>
              <Text size="xs" mt={4}>
                52 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item bullet={<GitCommit size={12} />} title="Security issues">
              <Text color="dimmed" size="sm">
                Fixing all the secutiry issues, and implmenting spam functions
              </Text>
              <Text size="xs" mt={4}>
                52 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Final release v1"
              bullet={<GitPullRequest size={12} />}
              lineVariant="dashed"
            >
              <Text color="dimmed" size="sm">
                Final release - better info text, landings & popups
              </Text>
              <Text size="xs" mt={4}>
                34 minutes ago
              </Text>
            </Timeline.Item>
          </Timeline>
        </Grid.Col>
      </Grid>

      <NavLink to="u/1CY">
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          leftIcon={<UserCircle />}
          sx={{ marginRight: 12 }}
        >
          Demo Profile
        </Button>
      </NavLink>
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
