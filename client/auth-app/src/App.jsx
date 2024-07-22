
 import './App.css'

import { Routes ,Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import RefrshHandler from './RefreshHandler'
import { useState } from 'react'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }



  return (

    <>
    <RefrshHandler setIsAuthenticated={setIsAuthenticated}/>
     <Routes>
      <Route path="/" element={<Navigate to ="/login"/>}/>
       <Route path="/signup" element={<Signup/>} />
       <Route path="/login" element={<Login />} />
       <Route path="/home" element={<Home/>} />
       <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
       {/*   <Route path='/home' element={<PrivateRoute element={<Home />} />} /> */}
     </Routes>
    </>
  )
}

export default App
