import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Home from 'pages/Home/Home';
import Users from 'pages/Users/Users';
import Admin from 'pages/Admin/Admin';

import './App.scss';

const App = () => (
  <div className="App">
    <main>
      <Router>
        <div >
          <nav className="main-menu">
            <ul>
              <li className="main-menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="main-menu-item">
                <Link to="/users">Users</Link>
              </li>
              <li className="main-menu-item">
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  </div>
);

export default App;
