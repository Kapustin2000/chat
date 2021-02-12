import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginAction } from '../store/actions/user';
import { toast } from 'react-toastify';

import userIcon from '../images/user-icon.svg';
import lockIcon from '../images/lock-icon.svg';

const SignInForm = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginAction({ mail, pass })).then((data) => {
      if (data) {
        history.push('/join');
      } else {
        toast.error('Wrong email or password!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  return (
    <form autoComplete='off' action='/' method='post' onSubmit={handleSubmit}>
      <div className='field-wrap'>
        <img src={`${userIcon}`} alt='' />
        <input
          type='text'
          required
          autoComplete='off'
          placeholder='Login'
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div className='field-wrap'>
        <img src={`${lockIcon}`} alt='' />
        <input
          type='password'
          required
          autoComplete='off'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className='checkbox'>
        <input type='checkbox' defaultChecked='checked' />
        <label>Forget password</label>
      </div>
      <button className='btn' type='submit'>
        Log In
      </button>
    </form>
  );
};

export default SignInForm;
