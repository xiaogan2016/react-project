import React, { Component } from 'react';
import RegistForm from './RegistForm';

class Regist extends Component {
  render() {
    return (
       <div className="regist">
            <div className="regist-box fr">
                <h3>用户注册</h3>
                <RegistForm></RegistForm>
            </div>
      </div>
    );
  }
}

export default Regist;