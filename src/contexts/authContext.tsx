import React, { createContext, useContext, FC, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { sendRequest } from 'helpers/fetch-wrapper';
import _G from 'helpers/global';

const server = process.env.REACT_APP_SERVER_URL;

export type LoginCreds = {
  email: string;
  password: string;
};

const AuthContext = createContext({
  isAuth: false,
  checkIsAuth: () => Promise.resolve(),
  login: (creds: LoginCreds) => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider: FC = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  const checkIsAuth = () => {
    const url = `${server}/isAuth`;
    return sendRequest(url)
      .then((res) => res.json())
      .then((res) => { if (res.isAuth) enter(); })
      .catch((err) => console.error(err));
  }

  const enter = () => {
    setIsAuth(true);
    if (location.pathname !== '/home')
      history.push('/home');
  };

  const login = (cred: LoginCreds) => {
    const url = `${server}/login`;
    return sendRequest(url, 'POST', cred)
      .then(() => {
        enter();
      })
      .catch((err) => console.error(err));
  };

  const exit = () => {
    setIsAuth(false);
    if (location.pathname !== '/')
      history.push('/');
  }

  const logout = () => {
    const url = `${server}/logout`;
    return sendRequest(url, 'POST')
      .then(() => exit())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    _G.exit = exit;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, checkIsAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}
