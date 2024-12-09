import React, { useContext } from "react";
import { assets } from "../assets/assets";
import {motion} from "framer-motion"; 
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const {user, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();

const onClickHandler = () => {
  if(user) {
    navigate('/result');
  }
  else{
    setShowLogin(true);
  }
}
  return (
    <motion.div
    initial={{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    className="flex flex-col justify-center items-center text-center my-20 sm:overflow-x-hidden">

      <motion.div
      initial={{opacity: 0.2, y: -20}}
      transition={{delay: 0.2, duration: 0.8}}
      animate={{opacity: 1, y: 0}}
      className="text-stone-700 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 bg-gradient-to-r from-gray-50 to-blue-300">
        <p>Best text image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 0.4, duration: 2}}
      className="text-4xl mx-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-cenetr font-light ">
        Turn text to <span className="text-blue-600">Image</span>,in Seconds.
      </motion.h1>

      <motion.p
       initial={{opacity: 0, y: 20}}
       animate={{opacity: 1, y:0}}
       transition={{delay: 0.6, duration: 0.8}}
      className="text-center max-w-xl mx-auto mt-5">
        Bring your imagination to life with AI! Transform your ideas into
        stunning visual art in seconds—just type and let the magic unfold.
      </motion.p>

      {/* <button className="sm:text-lg  text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full ">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </button> */}

      <button
      onClick={()=>onClickHandler()}
      className="flex sm:text-lg gap-2 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black w-auto mt-8 px-12 py-2.5 items-center rounded-full border border-blue-600 hover:scale-110 duration-300 hover:text-blue-200 hover:border-blue-500 hover:from-black hover:to-blue-700">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </button>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1, duration: 1}}

      className="flex flex-wrap justify-center mt-16 gap-3">
        {Array(6)
          .fill("")
          .map((item, index) => {
            return (
              <motion.img
              whileHover={{scale: 1.05, duration: 0.1}}
                className="rounded hover:scale-105 duration-300 cursor-pointer max-sm:w-10"
                src={index % 2 == 0 ? assets.sample_img_3 : assets.sample_img_2}
                key={index}
                alt=""
                width={70}
              />
            );
          })}
      </motion.div>
      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.2, duration: 0.8}}
      
      className="mt-2 text-neutral-600">Powered by ArtFusion</motion.p>
    </motion.div>
  );
};

export default Header;
