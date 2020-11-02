import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { UserContext } from "components/UserContextProvider";
import { STORAGE_JWT } from "constants/index";
import jwt_decode from "jwt-decode";

const AuthGoogle = gql`
  mutation AuthGoogle($accessToken: String!) {
    authGoogle(accessToken: $accessToken) {
      token
      name
    }
  }
`;

const GoogleLoginButton = ({ onSuccessCallback, onFailureCallback }) => {
  const { setUser } = useContext(UserContext);
  const [authGoogle] = useMutation(AuthGoogle, {
    onCompleted: (data) => {
      const token = data.authGoogle.token;
      localStorage.setItem(STORAGE_JWT, token);
      setUser(jwt_decode(token));
      onSuccessCallback && onSuccessCallback(data);
    },
    // TODO: should also handle errors for mutation
  });

  const onSuccessGoogle = (res) => {
    authGoogle({ variables: { accessToken: res.accessToken } });
  };

  const onErrorGoogle = (res) => {
    console.log(res);
    onFailureCallback && onFailureCallback(res);
  };

  return (
    <GoogleLogin
      clientId="1020239480532-fq5ufnvt7741e48lpoe36lgq3vmimr00.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccessGoogle}
      onFailure={onErrorGoogle}
    />
  );
};

export default GoogleLoginButton;
