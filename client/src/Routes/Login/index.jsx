import React, { useContext } from "react";
import GoogleLoginButton from "components/GoogleLoginButton";
import LogOutButton from "components/LogOutButton";
import { UserContext } from "components/UserContextProvider";
import { Link } from "react-router-dom";


const Login = () => {
  const { user } = useContext(UserContext);


  return <div>{!!user ? <div><LogOutButton /> or go <Link to="/">Home</Link></div> : <GoogleLoginButton />}</div>;
};

export default Login;
