import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {  addUpComingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useUpComingMovies=()=>{
 
 //fetch data from TMBD API and Update store
    const dispatch=useDispatch();

  const getUpComingMovies=async()=>{
    const data= await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS
    );

    const json=await data.json();
  
    dispatch(addUpComingMovies(json.results))

  }


  useEffect(()=>{
    getUpComingMovies();
  },[])

}

export default useUpComingMovies;