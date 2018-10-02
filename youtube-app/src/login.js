import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import {connect} from 'react-redux';
import {login} from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';

const responseGoogle = (response) => {
  console.log(response.hg.id_token);
}
 
ReactDOM.render(
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />,
  document.getElementById('googleButton')
);