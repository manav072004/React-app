import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <GoogleOAuthProvider clientId="1041691092365-jur4pge19ubaju429ak9dkliuu06enrs.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  );
};

export default App;