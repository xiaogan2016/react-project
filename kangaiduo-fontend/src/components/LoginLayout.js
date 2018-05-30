import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {Route} from 'react-router-dom'
class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login-box fr">
          <h3>康爱多后台管理系统管理员登陆</h3>
          {/* <LoginForm></LoginForm> */}
          <Route path='/' component={LoginForm}></Route>
        </div>
      </div>
    );
  }
}

export default Login;