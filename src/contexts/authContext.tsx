import React, {
  createContext, useContext, FC, useEffect, useReducer,
} from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { sendRequest } from '../helpers/fetch-wrapper';
import _G from '../helpers/global';

const server = process.env.REACT_APP_SERVER_URL;

export type LoginCreds = {
  email: string;
  password: string;
};

const unknownUser: User = {
  username: '',
  email: '',
  role: {
    roleName: 'unknown',
    write: false,
  },
};

type AuthState = {
  hasAppLoaded: boolean;
  isAuth: boolean;
  user: User;
};

const AuthContext = createContext({
  hasAppLoaded: false,
  isAuth: false,
  user: unknownUser,
  checkIsAuth: () => Promise.resolve(),
  login: (creds: LoginCreds) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  const [{ hasAppLoaded, isAuth, user }, dispatch] = useReducer(
    (prevState: AuthState, newState: Partial<AuthState>) => ({ ...prevState, ...newState }),
    {
      hasAppLoaded: false,
      isAuth: false,
      user: unknownUser,
    },
  );

  const checkIsAuth = () => {
    const url = `${server}/isAuth`;
    return sendRequest(url)
      .then((res) => res.json())
      .then((res) => { if (res.isAuth) enter(res.user); })
      .then(() => dispatch({ hasAppLoaded: true }))
      .catch((err) => console.error(err));
  };

  const enter = (fetchedUser: User) => {
    dispatch({ isAuth: true, user: fetchedUser });
  };

  const login = (cred: LoginCreds) => {
    const url = `${server}/login`;
    return sendRequest(url, 'POST', cred)
      .then((res) => res.json())
      .then((res) => enter(res.user))
      .then(() => history.push('/'))
      .catch((err) => console.error(err));
  };

  const exit = () => {
    dispatch({ isAuth: false, user: unknownUser });
    if (location.pathname !== '/') history.push('/');
  };

  const logout = () => {
    const url = `${server}/logout`;
    return sendRequest(url, 'POST')
      .then(() => exit())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    checkIsAuth();
    _G.exit = exit;
  }, []);

  return (
    <AuthContext.Provider value={{
      hasAppLoaded, isAuth, user, checkIsAuth, login, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}
