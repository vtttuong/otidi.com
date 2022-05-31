import React from "react";

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
  logicError: boolean;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
  const token = localStorage.getItem("secondhand_token");
  // JWT decode & check token validity & expiration.
  if (token) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());

  const [logicError, setLogicError] = React.useState(false);
  async function authenticate({ username, password }, cb) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        grant_type: process.env.REACT_APP_LARAVEL_GRANT_TYPE,
        client_id: process.env.REACT_APP_LARAVEL_CLIENT_ID,
        client_secret: process.env.REACT_APP_LARAVEL_CLIENT_SECRET,
        provider: process.env.REACT_APP_LARAVEL_PROVIDER,
      }),
    };

    const res = await fetch(
      process.env.REACT_APP_LARAVEL_API_URL + "/oauth/token",
      options
    );

    const data = await res.json();

    if (data && data.error) {
      makeAuthenticated(false);
      setLogicError(true);
    }

    if (data && data.access_token) {
      localStorage.setItem("secondhand_token", `${data.access_token}`);
      makeAuthenticated(true);
    }

    setTimeout(cb, 100); // fake async
  }

  async function signout(cb) {
    const token = localStorage.getItem("secondhand_token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(
      process.env.REACT_APP_LARAVEL_API_URL + "/api/admin/v1/me/logout",
      options
    );

    if (res.ok) {
      makeAuthenticated(false);
      localStorage.removeItem("secondhand_token");
    }

    setTimeout(cb, 100);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
        logicError,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
