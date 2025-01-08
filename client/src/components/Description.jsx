import React from 'react'
import { motion } from "motion/react"
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <motion.div
    initial={{ opacity: 0.2 ,y:100 }}
    whileInView={{ opacity: 1 , y:0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className=' flex flex-col items-center justify-center
    my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>
        Turn your imagination onto visuals
      </p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row
      items-center'>
        <img className='w-80 xl:w-96 rounded-lg' src={assets.sample_img_1} alt="" />
        <div className=''>
          <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Alma , The Text to Image Generator From Almage</h2>
          <p className='text-gray-600 mb-4'>
            Easily bring your ideas to life with our free AI image generator whether you need stunning visuals or
            unique imagery, our tool transforms your text into eye-catching images with just few clicks imagine it , describe it,
            and watch it come to life instantly.
          </p>
          <p className='text-gray-600' >
            Simply type in a text prompt , and our cutting-edge AI Alma will generate high-quality images in seconds. From product visuals to character designs and portraits,
            even concepts that don't yet exist can be visualized.
             Powered by advanced AI technology, the creative possibilities are limitless!
          </p>

        </div>
      </div>
    </motion.div>
  )
}

export default Description