import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Login(){
    const { authenticate, isAuthenticated,isInitialized, isAuthenticating, user, account, logout } = useMoralis();
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

    return(<div>
                {!isAuthenticated ?
          <button onClick={login}>Moralis Metamask Login</button> :
          <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
        }
    </div>)
}

// {isAuthenticated && (
//   <NavLink to="Settings">
//     <Button
//       variant="gradient"
//       gradient={{ from: "orange", to: "red" }}
//       leftIcon={<UserCircle />}
//       onClick={logOut}
//     >
//       Profile
//     </Button>
//   </NavLink>
// )}
// {isAuthenticated ? (
//   <li>
//     <Button
//       variant="gradient"
//       gradient={{ from: "orange", to: "red" }}
//       onClick={logOut}
//       leftIcon={<Logout />}
//     >
//       Logout
//     </Button>
//   </li>
// ) : (
//   <li>
//     <Button
//       variant="gradient"
//       gradient={{ from: "orange", to: "red" }}
//       onClick={login}
//       leftIcon={<Login />}
//     >
//       Login
//     </Button>
//   </li>
// )}