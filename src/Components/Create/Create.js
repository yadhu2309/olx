import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/FirebaseContext'
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [state,setState] = useState({Name:'',category:'',Price:''})
  const [ image,setImage] = useState(null)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const date = new Date()
  const history = useHistory()

  const makeChange=(e)=>{
    const {name,value} = e.target
    setState(prevState=>({...prevState,[name]:value}))
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          
              name:state.Name,
              category:state.category,
              price:state.Price,
              url:url,
              userId:user.uid,
              createAt:date.toDateString()
            })
            history.push('/')
                 
      })
    })
    // 


  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={state.Name}
              onChange={makeChange}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={state.category}
              onChange={makeChange}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
             type="number" 
             id="fname"
              name="Price" 
              value={state.Price}
              onChange={makeChange}
              />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):null}></img>
          <form>
            <br />
            <input onChange={(e)=>{
                 setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={onSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
