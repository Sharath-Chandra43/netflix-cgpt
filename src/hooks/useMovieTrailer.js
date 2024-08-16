import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";


const useMovieTrailer=(movieId)=>{

    const dispatch=useDispatch();
    

    


// fetch trailer video && updating the store
    const getMovieVideo=async()=>{
        const data =await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?",API_OPTIONS)
        const json=await data.json()
   


        const filteredData=json.results.filter(video=>video.type==="Trailer")
         
        const trailer=filteredData.length ? filteredData[0]:json.results[0];

        
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(()=>{
      getMovieVideo();
    },[])

}

export default useMovieTrailer;