import React from 'react'




const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-4xl font-bold lg:text-xl'>{title}</h1>
        <p className='hidden md:inline-block text-lg py-6 w-1/4 lg:text-xl lg:font-extralight lg:w-1/2 '>{overview}</p>
        <div className='my-4 md:m-0'>
            <button className=' py-2 md:py-4  bg-white text-black font-bold px-4 md:px-12  rounded-lg mx-2 hover:bg-opacity-50 '> Play</button>
            <button className='p-4  mx-2 bg-gray-800 bg-opacity-55 text-white  px-12 rounded-lg hover:bg-opacity-0 hidden md:inline-block'> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle