import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Signup = () => {

const [signupinfo,setsignupinfo]=useState({
    username:'',
    email:'',
    password:''
})
const Navigate = useNavigate()

const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value)
    //store the name and value to the signupinfo
    //extract the state
    const copysignupinfo={...signupinfo}
    //update the value in the copysignupinfo
    copysignupinfo[name]=value
    //set the state with that copysignupinfo
    setsignupinfo(copysignupinfo)
}
console.log(signupinfo)

const handleSignUp=async(e)=>{
    e.preventDefault()

    const {username,email,password}=signupinfo;

   if(!username||!email||!password){
    return handleError("username,email,password is required")
   }

  try{
    const url ="https://auth-full-stak-app.vercel.app/user/signup"

    const response = await fetch(url,{

      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },

      body: JSON.stringify(signupinfo)

    })
   //get the response
    const result = await response.json()

    console.log(result)
    //if the user is singup successfully
    const {message,success,error}=result

    if(success){
        handleSuccess(message)
        setTimeout(() => {
            Navigate("/login")
        }, 1000);
    }
    else if (error) {
        const details = error?.details[0].message;
        handleError(details);
    } else if (!success) {
        handleError(message);
    }
    console.log(result)

  }

  catch(err){
    handleError(err.message)
  }
}








  return (
    <div className='container'>
     <h1>signup</h1>
    <form onSubmit={handleSignUp}>
   <div>
     <label htmlFor='username'>Username:</label>
     <input 
     type='text' 
      name='username'
      onChange={handleChange}
      autoFocus
      placeholder='Enter your username'
      value={signupinfo.username}
      />
   </div>
 <div>
     <label htmlFor='username'>email:</label>
     <input 
     type='email' 
     onChange={handleChange}
     name='email'
      placeholder='Enter your email'
      value={signupinfo.email}
      
      />
   </div>
   <div>
     <label htmlFor='username'>password:</label>
     <input 
      onChange={handleChange}
     type='password' 
      name='password'
      placeholder='Enter your password' 
      value={signupinfo.password}
      />
   </div>
   
   <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>



    </form>

<ToastContainer/>
    </div>
  )
}

export default Signup