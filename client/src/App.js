import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import openSocket from 'socket.io-client';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { dashboard } from './config/apis';
const browserHistory = createBrowserHistory();

// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw
// });

validate.validators = {
  ...validate.validators,
  ...validators
};
const UserContext = React.createContext({
  name: 'Guest',
  jwt: undefined,
});
export default class App extends Component {
  state = {
    user: undefined,
    jwt: undefined,
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  _loadAsyncData() {
    dashboard.post(`/getProfile`, {}, { headers: { jwt: this.state.jwt } }).then((user) => {
      console.log(user);
      sessionStorage.setItem('user', JSON.stringify(user.data));
      this.setState({ user: user.data, jwt: this.state.jwt })
    })
  }
  async componentDidMount() {
    const jwt = this.getCookie("jwt");
    console.log(jwt);
    await this.setState({ user: undefined, jwt })
    console.log(this.state)
    this._loadAsyncData()
    // var socket = openSocket('http://localhost:5000', {query: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4ZDdiOWI5LWY4ZTAtNDc3Yi05MWZkLTc1YTg1MWZjMGRlOSIsInVzZXJuYW1lIjoiU2lsYXMuTGFrZXMiLCJwYXNzd29yZCI6IiQyYSQxMCROU3lacmdxTW5zZW90VTNPd0l3MjdlMWFvYWRBM0hOTlBERy5SYktIOWl3TFJWS0U0cWp1QyIsImNyZWF0ZWRBdCI6IjIwMTktMTItMTBUMDI6Mzg6MTIuMzA3WiIsInVwZGF0ZWRBdCI6IjIwMTktMTItMTBUMDI6Mzg6MTIuMzA3WiIsImlhdCI6MTU3NTk0NTgwOCwiZXhwIjoxNTc4NTM3ODA4fQ.VNCDgwHHAOiGrccsErAEIs-E0zVTiozTesPRl_fsPzU'});
    // // Connection failed
    // socket.on('error', function(err) {
    //   console.log(err);
    // });
    // // Connection succeeded
    // socket.on('success', function(data) {
    //   console.log(data.message);
    //   console.log(data.user);
    // })
    // socket.on('messageNotification', function(data) {
    //   console.log(data);
    // })
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }
  render() {
    const { signedInUser } = this.props;
    console.log(this.state)
    if (!this.state.user & this.getCookie("jwt")) {
      return (<h1>loading</h1>)
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      );
    }
  }
}
