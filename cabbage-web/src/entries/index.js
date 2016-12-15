import ReactDOM from 'react-dom';
import React from 'react';
import { Router, browserHistory, hashHistory } from 'react-router';

// page
import App from '../page/App';
import DashBoard from '../page/DashBoard';
import Create from '../page/Create';
import Import from '../page/Import';
import Log from '../page/Log';

const routes = [{
  path: '/',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
  childRoutes: [
    { path: '/dashboard', component: DashBoard}, 
    { path: '/create',component:Create},
    { path: '/import',component:Import}
  ]
}];

ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('root'));


