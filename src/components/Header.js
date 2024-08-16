import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {auth} from "../utils/firebase"
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'


const Header = () => {
  const dispatch=useDispatch()

  const navigate=useNavigate();
  
  const user=useSelector(store=>store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);

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


const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
}


const handleLanguageChange=(e)=>{
  dispatch(changeLanguage(e.target.value))
}




  return (
  <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  justify-between bg-opacity-10  bg-black sm:bg-blue-900 md:bg-green-800">
    <img className='w-44 mx-auto md:mx-0' 
    src={LOGO}
    alt='logo'/>
  

 {user && (
  <div className='flex justify-between p-2 '>
    { showGptSearch &&
    <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
    </select> }
    <button className='py-2 px-4 m-2 bg-purple-800 text-white rounded-lg mx-2 my-2' onClick={handleGptSearchClick}>{showGptSearch ? "HomePage": "Gpt Search"}</button> 
    <button onClick={handleSignOut} className=' font-bold text-white'>
      (Sign Out)

    </button>
    <img className='w-11 hidden md:inline-block' src={user.photoURL} alt="user" />
  
  </div>
)} 
  </div>
  );
};

export default Header