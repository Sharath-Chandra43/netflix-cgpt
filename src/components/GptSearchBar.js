import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';


const GptSearchBar = () => {

    const dispatch=useDispatch()
    const langKey=useSelector(store=>store.config.lang);

    const searchText=useRef(null);

    // search movie in TMDB 

    const searchMovieTMDB=async(movie)=>{
        const data =await fetch(
            "https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",API_OPTIONS
        );

        const json=await data.json()
        return json.results
    }

const handleGptSearchClick= async ()=>{
    console.log(searchText.current.value);

    const gptQuerry='Act as a Movie Recommendation System and suggest some movies for the query: '+searchText.current.value+". Only Give me name of 5 Movies, comma seperated like the example result given ahead. Example Result: sholey,racegurram,gollmall,pushpa,pushpa2"
    //make an API call to GPT API to get movies results 
   const getResults= await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuerry }],
        model: 'gpt-3.5-turbo',
      });

if(!getResults.choices){
    //TODO:Write error handlding
}

 
console.log(getResults.choices?.[0]?.message.content)

const gptMovies =getResults.choices?.[0]?.message.content.split(",")

// For each movie I will Search TMDB API 

const promiseArrya=gptMovies.map(movie=>searchMovieTMDB(movie))

 const tmdbResults=await Promise.all(promiseArrya)
    console.log(tmdbResults)

    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
};

  return (
    <div className='pt-[45%] md:pt-[12%] flex justify-center p-4'>
      <form className='w-full md:w-1/2 bg-slate-500 bg-opacity-60 grid grid-cols-12 ' onSubmit={(e)=>e.preventDefault()}>
        <input ref={searchText} type="text" className='p-4 m-4 col-span-9' placeholder={lang[langKey].sptSearchPlaceHolder} />
        <button className='py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg ' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar