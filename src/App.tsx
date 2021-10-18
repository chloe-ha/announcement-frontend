import React, { FC } from 'react';
import { Redirect } from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { useAuth, AuthProvider } from 'contexts/authContext';

import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Users from 'pages/Users/Users';
import Admin from 'pages/Admin/Admin';
import Signup from 'pages/Signup/Signup';

import './App.scss';

const App: FC = () => {
  const { isAuth, user, logout } = useAuth();
  const userHasRestrictedAccess = user.role.write;

  return (
    <div className="app">
      <nav className="main-menu">
        <ul>
          {isAuth && <li className="main-menu-item"><Link to="/">Home</Link></li>}
          {isAuth && userHasRestrictedAccess && <li className="main-menu-item"><Link to="/users">Users</Link></li>}
          {isAuth && userHasRestrictedAccess && <li className="main-menu-item"><Link to="/admin">Admin</Link></li>}
          <li className="main-menu-item">
            {isAuth
              ? <div className="logout-button" onClick={logout}>Logout</div>
              : <Link to="/login">Login</Link>
            }
          </li>
          {isAuth && user.role.roleName !== 'unknown' &&
            <div className="profile">{`Welcome ${user.username} (${user.role.roleName})`}</div>
          }
        </ul>
      </nav>
      <Switch>
        <PrivateRoute path="/admin" restrictedAccess={true}><Admin /></PrivateRoute>
        <PrivateRoute path="/users" restrictedAccess={true}><Users /></PrivateRoute>
        <Route path="/login"><Login /></Route>
        <Route path="/signup/:token" component={Signup}></Route>
        <PrivateRoute path="/"><Home /></PrivateRoute>
      </Switch>
    </div>
  );
};

const AppWithContext = () => (
  <div className="App">
    <main>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </main>
  </div>
);

export default AppWithContext;

type PrivateRouteType = {
  path: string;
  restrictedAccess?: boolean;
}
const PrivateRoute: FC<PrivateRouteType> = ({ children, path, restrictedAccess = false }) => {
  const { isAuth, user } = useAuth();
  const userHasRestrictedAccess = user.role.write;
  const routeElement = isAuth === true
    ? !restrictedAccess || (restrictedAccess && userHasRestrictedAccess)
      ? children
      : <Redirect to="/" />
    : <Redirect to="/login" />;

  return <Route path={path} render={() => routeElement} />;
}
