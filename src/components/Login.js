import React, { useRef, useState } from 'react'
import Header from './Header'
import {checkValidData} from "../utils/validate";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
//import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
const Login = () => {

   const [isSignInForm,setIsSignInForm]=useState(true);

   const [errorMessage,setErrorMessage]=useState(null)
  
   const dispatch=useDispatch();


   const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
   };
   
   const name=useRef(null);
   const email=useRef(null);
   const password=useRef(null);

   const handleButtonClick=()=>{
    //Validate Form data
   const message= checkValidData(email.current.value,password.current.value)
   setErrorMessage(message)

   if(message) return;

   if(!isSignInForm){
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value)
       .then((userCredential) => {
    // Signed up 
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVATAR,
        })
        .then(() => {
          

           
          const{uid,email,photoURL,displayName}=auth.currentUser
          dispatch(
            addUser
            ({
              uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL,
            })
          );
         
        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        });



        
    // ...
     })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    // ..
    setErrorMessage(errorCode +" "+ errorMessage);
  }); 
}
   else{
    // Sign In Logic

    signInWithEmailAndPassword(auth, email.current.value, password.current.value,)
  .then((userCredential) => {
    const user = userCredential.user;

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +" "+ errorMessage);

  });
   };

   }

  return (

    <div>
        <Header />
        <div className='absolute'>
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg 1800w" alt="" />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='p-12 text-white bg-black bg-opacity-75 absolute w-3/12 my-36 mx-auto right-0 left-0 rounded-lg'>
           <h1 className='font-bold font-serif text-3xl py-4'>{isSignInForm ? "Sign In" :"Sign Up"}</h1>
           {!isSignInForm && <input type="text" placeholder='Full Name' className='p-4 my-4  w-full rounded-lg bg-slate-600 bg-opacity-65' ref={name} />}
            <input type="text" placeholder='Email Address' className='p-4 my-4  w-full rounded-lg bg-slate-600 bg-opacity-65' ref={email} />
            <input type="password" placeholder='Password' className='p-4 my-4 w-full rounded-lg bg-slate-600 bg-opacity-65'  ref={password}/>
            <div>
                <p className='text-red-600 font-bold'>{errorMessage}</p>
            <button  className='p-2 my-6 bg-red-600 w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" :"Sign Up"}</button>
            </div>
            <p className='py-6 font-bold cursor-pointer' onClick={toggleSignInForm}>
               
                {isSignInForm ? " New to Netflix? Sign Up Now." :"Already registered! Sign In Now."}
                </p>
        </form>
    </div>
  )
}

export default Login