import React from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {auth} from "../utils/firebase"
import { useSelector } from 'react-redux'


const Header = () => {

  const navigate=useNavigate();
  
  const user=useSelector(store=>store.user);


  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }



  return (
  <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from to-black z-10 flex justify-between">
    <img className='w-44 bg-fixed' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
    alt='logo'/>
  

 { user && (<div className='flex p-2 m-2'> 
    <button onClick={handleSignOut} className='bg-red-600 font-bold text-white rounded-lg p-4 m-4'>(Sign Out)</button>
    <img className='w-11 ' src={user.photoURL} alt="user" />
  
  </div>)
}
  </div>
  )
}

export default Header