import React, { FC } from 'react';
import { Redirect } from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import Admin from './pages/Admin/Admin';
import Signup from './pages/Signup/Signup';
import AccountWidget from './components/AccountWidget/AccountWidget';
import { useAuth, AuthProvider } from './contexts/authContext';

import './App.scss';

const App: FC = () => {
  const { isAuth, user } = useAuth();
  const userHasRestrictedAccess = user.role.write;

  return (
    <div className="app">
      <nav className="main-menu">
        <ul>
          {isAuth && <li><Link className="main-menu-item" to="/">Home</Link></li>}
          {isAuth && userHasRestrictedAccess
            && <li><Link className="main-menu-item" to="/users">Users</Link></li>}
          {isAuth && userHasRestrictedAccess
            && <li><Link className="main-menu-item" to="/admin">Admin</Link></li>}
          {!isAuth && (
          <li>
            <Link className="main-menu-item" to="/login">Login</Link>
          </li>
          )}
          {isAuth && <AccountWidget />}
        </ul>
      </nav>
      <Switch>
        <PrivateRoute path="/admin" restrictedAccess><Admin /></PrivateRoute>
        <PrivateRoute path="/users" restrictedAccess><Users /></PrivateRoute>
        <Route path="/login"><Login /></Route>
        <Route path="/signup/:token" component={Signup} />
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
};
