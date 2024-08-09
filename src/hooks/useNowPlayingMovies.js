import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useNowPlayingMovies=()=>{
 
 //fetch data from TMBD API and Update store
    const dispatch=useDispatch();

  const getNOWPlayingMOvies=async()=>{
    const data= await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS
    );

    const json=await data.json();
  
    dispatch(addNowPlayingMovies(json.results))

  }


  useEffect(()=>{
    getNOWPlayingMOvies();
  },[])

}

export default useNowPlayingMovies;