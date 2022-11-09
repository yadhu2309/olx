import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import {FirebaseContext} from '../../store/FirebaseContext'
import {useHistory} from 'react-router-dom'

function Login() {
  const [state,setState] = useState({email:'',password:''})
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const makeChange = (event)=>{
    const {name,value} = event.target;
    setState(prevState =>({...prevState,[name]:value}))

  }

  const handleLogin = (event)=>{
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(state.email,state.password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={state.email}
            onChange={makeChange}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={makeChange}
            value={state.password}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
