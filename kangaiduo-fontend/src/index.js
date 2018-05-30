import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
//引入redux-logger
//每次调用dispatch,就会跟踪之前，之后和action状态，便于跟踪store
import logger from 'redux-logger';

import 'antd/dist/antd.css';
import './styles/app.scss';

import App from './App';

import { HashRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import  reducers from './store/reducers';

const store = createStore(reducers, applyMiddleware(thunk,logger));

ReactDOM.render(<Provider store={ store }><Router><App /></Router></Provider>, document.getElementById('root'));

