import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import BusById from './components/bus-by-id';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={App}></Route>
            <Route path='/local-lines' exact={true} component={Home}></Route>
            <Route path='/bus-by-id' exact={true} component={BusById}></Route>
            <App />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
serviceWorker.unregister();
