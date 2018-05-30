import React, { Component } from 'react';

import Login from './components/LoginLayout';
import Regist from './components/RegistLayout';
import Home from './components/HomeLayout';

import {//引入路由
  Route,
  Switch
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Login} ></Route>
          <Route path="/regist" component={Regist}></Route>
          <Route path="/home" component={Home}></Route>
      </Switch>
    );
  }
}

export default App;
