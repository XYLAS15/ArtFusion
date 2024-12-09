import React from 'react'
import { assets } from '../assets/assets'
import {motion} from "framer-motion"
const Footer = () => {
  return (
    
    <motion.div
    // initial={{opacity:0.5, x:100}}
    // whileInView={{opacity:1, x:0}}
    // transition={{duration: 0.8}}
   

    className='flex items-center justify-between gap-4 py-3 mt-20 ml-4'>

    <img src={assets.Art_logo} width={150} alt="" />

    <p className='flex-1 border-l border-blue-400 text-center pl-4 text-sm text-neutral-800 mx-sm:hidden'>Copyright @ArtFusion | All right reserved.</p>

    <div className='flex gap-2.5 flex-wrap'>
        <img src={assets.facebook_icon} width={35} alt="" className='cursor-pointer hover:scale-105'/>
        <img src={assets.twitter_icon} width={35} alt="" className='cursor-pointer hover:scale-105'/>
        <img src={assets.instagram_icon} width={35} alt="" className='cursor-pointer hover:scale-105'/>

    </div>
    </motion.div>
  )
}

export default Footer