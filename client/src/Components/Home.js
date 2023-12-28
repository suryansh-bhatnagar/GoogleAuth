import React from 'react'
import ContactlessSharpIcon from '@mui/icons-material/ContactlessSharp';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';



const Home = () => {
  return (
    <>
      <div className='text-left  w-1/3 mx-auto my-16 flex flex-col gap-6'>
        <h1 className='text-3xl font-semibold'>Learn to code - for free.</h1>
        <p className='text-3xl font-semibold'>Build projects.</p>
        <p className='text-3xl font-semibold'>Earn certificates.</p>
        <p className=' font-medium'> Since 2014, more than 40,000 FreeCodeCamp Org graduates have gotten jobs at tech companies including</p>
        <div className='flex gap-4 justify-between'>
          <div className='-rotate-90'><ContactlessSharpIcon fontSize='large' /></div>
          <div><FacebookSharpIcon fontSize='large' /></div>
          <div className='-rotate-90'><ContactlessSharpIcon fontSize='large' /></div>
          <div><FacebookSharpIcon fontSize='large' /></div>
          <div className='-rotate-90'><ContactlessSharpIcon fontSize='large' /></div>
        </div>
        <div className='bg-yellow-400 px-8 py-1 w-fit mx-auto rounded-md'>
          <p className='text-xl' >Get started (it's free)</p>
        </div>
      </div>
    </>
  )
}

export default Home