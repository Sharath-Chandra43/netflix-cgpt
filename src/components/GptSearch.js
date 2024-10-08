import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
         <img className='h-screen w-screen bg-cover  object-cover md:w-screen, md:h-screen,bg-cover' src={BG_URL} alt="" />
         </div>
    <div className='p-10'>
        <GptSearchBar />
        <GptMovieSuggestion />
    </div>
    </>
  )
}

export default GptSearch