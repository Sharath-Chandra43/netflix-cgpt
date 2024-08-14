import React from 'react'
import MovieList from './MovieList.js'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies=useSelector(store=>store.movies);
  return (
    movies.nowPlayingMovies &&(
    <div className=' bg-black'>
      <div className='-mt-52 relative z-20 pl-12'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Treding"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.PopularMovies}/>
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
      </div>
    </div>
    )
  )
}

export default SecondaryContainer