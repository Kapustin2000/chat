import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Validator from 'fastest-validator';
import clsx from 'clsx';

import { registerAction, loginAction } from '../store/actions/user';

import userIcon from '../images/user-icon.svg';
import lockIcon from '../images/lock-icon.svg';

const validationSchema = {
  name: {
    type: 'string',
    min: 1,
    messages: {
      required: 'This field cannot be blank',
    },
  },
  mail: {
    type: 'email',
    messages: {
      required: 'This field cannot be blank',
      email: 'Invalid e-mail',
    },
  },
  pass: {
    type: 'string',
    min: 6,
    max: 30,
    messages: {
      required: 'This field cannot be blank',
      stringMin: 'Passord length must be 6-30 characters',
      stringMax: 'Passord length must be 6-30 characters',
    },
  },
  agreement: {
    type: 'equal',
    value: true,
    messages: {
      equalValue: 'You have to agree with Privacy Policy and Terms',
    },
  },
};

const check = new Validator().compile(validationSchema);

const validate = (values) => {
  const errors = check(values);

  return errors.length
    ? errors.reduce((acc, val) => ({ ...acc, [val.field]: val.message }), {})
    : null;
};

const SignInForm = ({ props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate({ mail, pass, name, agreement });
    setErrors(errors);
    if (!errors) {
      dispatch(registerAction({ mail, pass, name, agreement }))
        .then((data) => {
          if (data?.status === 200) {
            dispatch(loginAction({ mail, pass })).then((data) => {
              if (data) {
                history.push('/join');
              }
            });
          } else {
            toast.error('Something went wrong', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => console.log('ERROR', err));
    }
  };

  return (
    <form autoComplete='off' action='/' method='post' onSubmit={handleSubmit}>
      <div
        className={clsx('field-wrap', {
          'field-wrap--err': errors?.name,
        })}
      >
        <img src={`${userIcon}`} alt='' />
        <input
          type='text'
          autoComplete='off'
          placeholder='Full Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        className={clsx('field-wrap', {
          'field-wrap--err': errors?.mail,
        })}
      >
        <img src={`${lockIcon}`} alt='' />
        <input
          type='email'
          autoComplete='off'
          placeholder='E-mail'
          value={mail}
          onChange={(e) => setMail(e.target.value.toLowerCase())}
        />
      </div>
      <div
        className={clsx('field-wrap', {
          'field-wrap--err': errors?.pass,
        })}
      >
        <img src={`${lockIcon}`} alt='' />
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div
        className={clsx('checkbox', {
          'checkbox--err': errors?.agreement,
        })}
      >
        <input
          type='checkbox'
          id='agreement'
          value={agreement}
          onChange={() => setAgreement((prevState) => !prevState)}
        />
        <label htmlFor='agreement'>
          I accept the <span> Privacy Policy</span> and <span>Terms</span>
        </label>
        {errors?.agreement && (
          <span className='field-wrap__error'>* {errors.agreement}</span>
        )}
      </div>
      <button className='btn btn--auth' type='submit'>
        Create Account
      </button>
    </form>
  );
};

export default SignInForm;
