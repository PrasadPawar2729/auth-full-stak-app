import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Login = () => {

const [loginupinfo,setloginupinfo]=useState({
    email:'',
    password:''
})
const Navigate = useNavigate()

const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value)
    //store the name and value to the loginupinfo
    //extract the state
    const copyloginupinfo={...loginupinfo}
    //update the value in the copyloginupinfo
    copyloginupinfo[name]=value
    //set the state with that copyloginupinfo
    setloginupinfo(copyloginupinfo)
}
 console.log(loginupinfo)

const handleloginUp=async(e)=>{
    e.preventDefault()

    const {email,password}=loginupinfo;

   if(!email||!password){
    return handleError("email,password is required")
   }

  try{
    const url ="https://auth-full-stak-app.vercel.app/user/login"

    const response = await fetch(url,{

      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },

      body: JSON.stringify(loginupinfo)

    })
   //get the response
    const result = await response.json()


    //if the user is login successfully
    const { success, message, jwtToken, username, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', username);
                setTimeout(() => {
                    Navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);

  }

  catch(err){
    handleError(err.message)
  }
}








  return (
    <div className='container'>
     <h1>login</h1>
    <form onSubmit={handleloginUp}>
 <div>
     <label htmlFor='username'>email:</label>
     <input 
     type='email' 
     onChange={handleChange}
     name='email'
      placeholder='Enter your email'
      value={loginupinfo.email}
      
      />
   </div>
   <div>
     <label htmlFor='password'>password:</label>
     <input 
      onChange={handleChange}
     type='password' 
      name='password'
      placeholder='Enter your password' 
      value={loginupinfo.password}
      />
   </div>
   
   <button type='submit'>login</button>
                <span>Doesn't have account ?
                    <Link to="/signup">signup</Link>
                </span>



    </form>

<ToastContainer/>
    </div>
  )
}

export default Login