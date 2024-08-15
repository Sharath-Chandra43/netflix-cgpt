import React from 'react'
import Header from './Header.js'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.js'
import MainContainer from './MainContainer.js'
import SecondaryContainer from './SecondaryContainer.js'
import useUpComingMovies from '../hooks/useTopRatedMovies.js'
import usePopularMovies from '../hooks/useTopRatedMovies.js'
import useTopRatedMovies from '../hooks/useTopRatedMovies.js'
import GptSearch from './GptSearch.js'
import { useSelector } from 'react-redux'


const Browse = () => {

  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)

  useNowPlayingMovies();
  useUpComingMovies();
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