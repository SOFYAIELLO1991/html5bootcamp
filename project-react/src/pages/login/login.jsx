import React from 'react';
import HelloYT from '../../components/hello-yt';
import Logo from '../../components/logo';

import './login.scss';

const Login = () => (
  <div className="Login">
    <div className="Login--content">
      <Logo />
      <HelloYT title="Hello from YouTube" />
    </div>
  </div>
);

export default Login;
