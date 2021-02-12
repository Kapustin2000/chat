import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import main_back from '../images/sign-back.png';

function AuthPage(props) {
  if (window.localStorage.TOKEN) {
    props.history.push('/join');
  }

  return (
    <div
      className='auth'
      style={{
        backgroundImage: 'url(' + main_back + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className='inner-container'>
        <h1>Welcome to Chat</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
        </p>
        <div className='buttons'>
          <NavLink to='/auth/signin'>
            <button className='btn'>Sign In</button>
          </NavLink>
          <NavLink to='/auth/register'>
            <button className='btn'>Sign Up</button>
          </NavLink>
        </div>
        <Route exact path='/auth/signin' component={SignInForm}></Route>
        <Route exact path='/auth/register' component={SignUpForm}></Route>
      </div>
    </div>
  );
}

export default AuthPage;
