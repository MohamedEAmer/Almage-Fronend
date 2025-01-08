import React from 'react'
import { motion } from "motion/react"
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {

  const [state , setState] = useState('Login')
  const {setShowLogin} = useContext(AppContext)

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = 'unset'};
  },[])

  return (
    <div className='fixed top-0 left-0 right-0
    bottom-0 z-10 backdrop-blur-sm bg-black/30 flex
    justify-center items-center'>
      <motion.form
      initial={{ opacity: 0.2 ,y:50 }}
      whileInView={{ opacity: 1 , y:0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}  
      className='relative bg-white p-10 rounded-xl
      text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700
        font-medium'>{state}</h1>
        {state === 'Login' &&<p className='text-sm'>Welcome back! Please sign in to continue</p>}
        {state !== 'Login' &&<p className='text-sm'>Welcome...! Sign Up if you don't have an account</p>}
        
        {state !== 'Login' && 
        <div className='border px-6 py-2 flex items-center gap-2
        rounded-full mt-5'>
            <img src={assets.user_icon} alt="" />
            <input className='outline-none text-sm' type='text' placeholder='Full Name' required/>
        </div>}

        <div className='border px-6 py-2 flex items-center gap-2
        rounded-full mt-4'>
            <img src={assets.email_icon} alt="" />
            <input className='outline-none text-sm' type='email' placeholder='Email Address' required/>
        </div>

        <div className='border px-6 py-2 flex items-center gap-2
        rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" />
            <input className='outline-none text-sm' type='password' placeholder='Password' required/>
        </div>

        {state === 'Login' &&<p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forget password?</p>
        }

        <button className='w-full bg-blue-600 text-white mt-4
        py-2 rounded-full hover:scale-105 transition-all duration-350'>
        { state === 'Login' ? 'Sign In' : 'Create Account' }</button>

        {state === 'Login' && <p className='text-center mt-5'>Don't have an account? <span onClick={()=>{setState('Sign Up')}} className='text-blue-600 cursor-pointer'>Sign Up</span></p>
        }

        {state !== 'Login' && 
        <p className='text-center mt-5'>Already have an account! <span onClick={()=>{setState('Login')}} className='text-blue-600 cursor-pointer'>Login</span></p>
        }
        <img onClick={()=>{setShowLogin(false)}} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" /> 

      </motion.form>
    </div>
  )
}

export default Login
