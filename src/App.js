import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import AdminComponent from './components/AdminComponent';
import NavbarComponent from './components/NavbarComponent';
import AuthComponent from './components/AuthComponent';
import DataComponent from './components/DataComponent';
import {AuthContext, useAuthContext} from './auth/AuthContext';
import {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


function App() {
  // const [principal, setPrincipal] = useState();

  return (
    <AuthComponent>
        <BrowserRouter>
          <NavbarComponent></NavbarComponent>
          <div class="container">
            <Switch>
              <Route path="/" exact component={LoginComponent}></Route>
              <Route path="/secured/main" exact component={HomeComponent}></Route>
              <Route path="/secured/data" exact component={DataComponent}></Route>
              <Route path="/secured/admin/users" exact component={AdminComponent}></Route>
            </Switch>
          </div>
        </BrowserRouter>
    </AuthComponent>
  );
}

export default App;
