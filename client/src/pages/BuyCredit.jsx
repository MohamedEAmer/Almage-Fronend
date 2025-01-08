import React from 'react'
import { motion } from "motion/react"
import { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const BuyCredit = () => {

  const {user} = useContext(AppContext)
  console.log(user)
  // const [selectedPlan, setSelectedPlan] = useState(null) 
  return (
    <motion.div
    initial={{ opacity: 0.2 ,y:100 }}
    whileInView={{ opacity: 1 , y:0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }} 
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2
      rounded-full mb-6' >Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
      
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item , index)=>{
          return (
            <div key={index} className='px-8 py-12 bg-white drop-shadow-sm rounded-lg cursor-pointer
            text-gray-600 hover:scale-105 transition-all duration-500'>
              <img className='rounded-lg' width={50} src={assets.logo2} alt={item.title}/>
              <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
              <p className='text-sm'>{item.desc}</p>
              <p className='mt-6'><span className='text-3xl font-medium'>${item.price}</span> / {item.credits} credits</p>
              <button className='w-full bg-gray-800 mt-8 text-sm text-white
              py-2.5 rounded-md min-w-52'>
              {user ? 'Purchase' : 'Get Started'}
              </button>
            </div>
          )
        })}
      </div>
    
    </motion.div>
  )
}

export default BuyCredit