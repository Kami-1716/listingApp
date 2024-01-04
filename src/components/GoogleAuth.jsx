import React from 'react'
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  return (
    <button className='flex items-center justify-center w-full px-7 py-3 text-sm sm:text-lg uppercase font-medium text-white bg-red-500 rounded-sm transition duration-200 ease-in-out hover:bg-red-600 active:bg-red-700 focus:outline-none'
    ><span className='bg-white rounded-full p-1 mr-2 text-2xl'
    ><FcGoogle/>
    </span> Continue With Google</button>
  )
}

export default GoogleAuth