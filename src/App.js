import React, { useEffect,useContext } from 'react';

import './App.css';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login'
import Create from './Components/Create/Create'
import View  from './Components/View/View';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Post from './store/PostContext'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
  console.log(user)
  firebase.auth().onAuthStateChanged((user)=>{
    setUser(user)
  })
  
   
  }, [])
  
  return (
    <div>
      <Post>
      <Router>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path='/signup'>
        <Signup />
        </Route>
        
        <Route path='/Login'>
        <Login></Login>
        </Route>
        <Route path='/create'>
        <Create></Create>
        </Route>
        <Route path='/view'>
        <View></View>
        </Route>
      </Router>

      </Post>
      
    </div>
  );
}

export default App;
