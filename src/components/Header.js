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
  <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  justify-between bg-opacity-10  bg-black sm:bg-gray-900 md:bg-gray-900">
    <img className='w-44 mx-auto md:mx-0' 
    src={LOGO}
    alt='logo'/>
  

  {user && (
  <div className='flex justify-between p-2 '>
    { showGptSearch &&
    <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
    </select> }
  

< button type="submit"  onClick={handleGptSearchClick} className="p-3 m-3  text-sm font-medium text-white bg-transparent  rounded-lg border ">

            {showGptSearch ? "HomePage": <svg className="w-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            }
</button>
 
    <button onClick={handleSignOut} className='py-3 px-6 mb-2 md:py-2  bg-orange-700 text-white font-bold  md:px-3 md:mt-4 md:mb-4  rounded-lg mx-1 hover:bg-opacity-50' >
      Sign Out

    </button>
    <img className='w-11 hidden md:inline-block' src={user.photoURL} alt="user" />
  
  </div>
)} 
  </div>
  );
};

export default Header;