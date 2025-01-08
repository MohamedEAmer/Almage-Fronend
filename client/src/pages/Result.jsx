import React from 'react'
import { useState } from 'react'
import { motion } from "motion/react"
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Result = () => {

  const [imageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image , setImage] = useState(assets.sample_img_1)
  const [input, setInput] = useState('')

  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate('/')
      setShowLogin(true)
    } else {
      setShowLogin(false)
    }
    // eslint-disable-next-line
  },[])

  const handleSubmit = async (e) => {
    // e.preventDefault()
    // setLoading(true)
    // try {
    //   const response = await fetch(`/api/generate?input=${input}`)
    //   const data = await response.json()
    //   setImage(data.url)
    //   setLoading(false)
    //   setImageLoaded(true)
    // } catch (error) {
    //   console.error(error)
    //   setLoading(false)
    // }
  }

  return (
    <motion.form
    initial={{ opacity: 0.2 ,y:100 }}
    whileInView={{ opacity: 1 , y:0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }} 
    className='flex flex-col min-h-[90vh] justify-center items-center' onSubmit={handleSubmit}>
      <div>
        <div className='relative'>
          <img className='max-w-sm rounded' src={image} alt="" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500
          ${loading ? 'w-full transition-all duration-[10s]': 'w-0'}`}></span>
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading.....</p>
      </div>
      {!imageLoaded && 
      <div className='flex w-full max-w-xl bg-neutral-500 text-white
      text-sm p-0.5 mt-10 rounded-full'>
        <input onChange={e => setInput(e.target.value)}
        value={input}
        className='flex-1 bg-transparent outline-none ml-8
        max-sm:w-20 placeholder-color' type="text" placeholder='Describe what you want to generate' />
        <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full' type='submit'>Generate</button>
      </div>
      }
      
      {imageLoaded &&
      <div className='flex gap-2 flex-wrap justify-center text-white
      text-sm p-0.5 mt-10 rounded-full'>
        <p onClick={()=>{setImageLoaded(false)}} className='bg-transparent border border-zinc-900 
        text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
        <a className=' bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' download href={image}>Download</a>
      </div>
      }
      
    </motion.form>
  )
}

export default Result
