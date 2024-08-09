import React from 'react'




const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%]  px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-4xl font-bold '>{title}</h1>
        <p className='text-lg py-6 w-1/4  '>{overview}</p>
        <div>
            <button className='p-4  bg-white text-black font-bold  px-12  rounded-lg mx-2 hover:bg-opacity-50 '> Play</button>
            <button className='p-4  mx-2 bg-gray-800 bg-opacity-55 text-white  px-12 rounded-lg hover:bg-opacity-0'> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle