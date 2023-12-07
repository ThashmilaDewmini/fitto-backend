import React, { useState } from 'react'
import "./Adminlogin.css"
import {auth} from './firebase';

import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';


function Adminlogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
          if(auth){
              navigate('/home');
          }
      })
      .catch(error => alert(error.message));
  }

  return (
    <div className="Admin-loggin">
        <div className='admin-logo'>
            <h1>FitTo ADMIN</h1>
        </div>
        <div className='login-container'>
            <h1>Log-in</h1>
            <form>
                <h4>Username</h4>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <h4>Password</h4>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'  className='log-in-button' onClick={signIn}>Log In</button>
                <Link to='/register'  ><h5>Register New Admin</h5></Link>
            </form>           
        </div>
    </div>
  )
}

export default Adminlogin;
