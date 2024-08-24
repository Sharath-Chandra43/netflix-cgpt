import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from "./MovieList"
const GptMovieSuggestion = () => {
  const {movieResults,movieNames} =useSelector(store=>store.gpt);
 
  if(!movieNames) return null;

  return (
    <div className='p-4 m-9 bg-gray-500 text-white  bg-opacity-90'>
      <div>
        {movieNames.map((movieName,index)=>( 
        <MovieList 
          key={movieName} 
          title={movieNames} 
          movies={movieResults[index]} />
        ))}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestion