import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {auth} from "../utils/firebase"
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants'


const Header = () => {
  const dispatch=useDispatch()

  const navigate=useNavigate();
  
  const user=useSelector(store=>store.user);


  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
     // navigate("/")
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }



  
useEffect(()=>{
 const unsubscribe= onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid,email,displayName,photoURL}=user;

      dispatch(
        addUser
        ({
          uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL,
        })
      );
      navigate("/browse")
      
      // ...
    } else {
      // User is signed out
      // ...

      dispatch(removeUser());
      navigate("/")
    }
  });

  // unsubscribe when component unmounts
  return ()=>unsubscribe()
  
},[])






  return (
  <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from to-black z-10 flex justify-between bg-opacity-70">
    <img className='w-44' 
    src={LOGO}
    alt='logo'/>
  

 {user && (<div className='flex p-2 m-2'> 
    <button onClick={handleSignOut} className='bg-red-600 font-bold text-white rounded-lg p-4 m-4'>(Sign Out)</button>
    <img className='w-11 ' src={user.photoURL} alt="user" />
  
  </div>)
} 
  </div>
  )
}

export default Header