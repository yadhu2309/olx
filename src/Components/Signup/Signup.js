import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import {FirebaseContext} from '../../store/FirebaseContext'
import {useHistory} from 'react-router-dom'

export default function Signup() {
  const history = useHistory()
  const [state,setState] = useState({name:'',email:'',phone:'',password:''})
  const [error,setError] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const makeChange = (event) =>{
       const {name,value} = event.target;
    setState(prevState =>({...prevState,[name]:value}))
  
    if(state.name.length < 1){
     setError('Error')
    }
    if(state.name.length>3){
      setError('')
    }
  }

  const onSubmit = (event) =>{
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(state.email,state.password).then((response)=>{
          response.user.updateProfile({displayName:state.name}).then(()=>{
            firebase.firestore().collection('users').add({
              id:response.user.uid,
              username:state.name,
              
              phone:state.phone,
              
            })
          }).then(()=>{history.push("/login")
        }) 
    }) 
    console.log(firebase)
    
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={state.name}
            onChange={makeChange}
            defaultValue="John"
          />
          <p style={{color:'red'}}>{error}</p>
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={state.phone}
            onChange={makeChange}
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={state.password}
            onChange={makeChange}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={onSubmit}>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
