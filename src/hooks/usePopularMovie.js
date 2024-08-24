import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import {  addPopularMovies } from "../utils/movieSlice.js";
import {useEffect} from "react";



const usePopularMovies=()=>{

  const dispatch=useDispatch();

  const getPopularMovie=async()=>{
    const data=await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',API_OPTIONS
    );

    const json=await data.json();

    dispatch(addPopularMovies(json.results))

  }


  useEffect(()=>{
    getPopularMovie();
  },[])
}

export default usePopularMovies