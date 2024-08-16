import React from 'react'
import { IMG_CDN_URL } from '../utils/constants.js'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div>
        <img className=' w-36 img mg:w-48 pr-4' alt='Movie Card' src={IMG_CDN_URL+posterPath} />
    </div>
  )
}

export default MovieCard