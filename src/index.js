import React from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import "antd/dist/antd.less";
import { createBrowserHistory } from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {isLoggedIn} from "axios-jwt";
import Login from "./components/User/LoginForm/Login";
import {Provider} from "react-redux";
import store from './store/store';

const history = createBrowserHistory({
  basename: process.env.BASE_NAME
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn() === true
      ? <Component {...props} />
      : <Redirect to={ '/login' } />
  )} />
);

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history} basename={process.env.REACT_APP_BACKEND_API}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={ Login }/>
          <PrivateRoute path="/" component={ DefaultLayout }/>
        </Switch>
      </Router>
    </Provider>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
