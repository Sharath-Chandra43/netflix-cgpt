import React from 'react'
import Header from './Header.js'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.js'
import MainContainer from './MainContainer.js'
import SecondaryContainer from './SecondaryContainer.js'
import useTopRatedMovies from '../hooks/useTopRatedMovies.js'
import GptSearch from './GptSearch.js'
import { useSelector } from 'react-redux'
import usePopularMovies from '../hooks/usePopularMovie.js'


const Browse = () => {

  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  

  return (
    <div>
      <Header />
      {showGptSearch ? (<GptSearch /> 
      ): 
      (
      <>
        <MainContainer />
        <SecondaryContainer />
      </>
      )}
    </div>
  )
}

export default Browse