import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import {motion} from "framer-motion"
import { AppContext} from "../context/AppContext";
const Result = () => {

  const [image, setImage] = useState(assets.sample_img_3) 
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

   const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    if(input) {
    const image = await generateImage(input)
      if(image) {
        setIsImageLoaded(true)
        setImage(image);
      }
    }
    setLoading(false);
  }

   return (
    <motion.form
    initial={{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    
    onSubmit={onSubmitHandler} className="flex flex-col min-h-[90vh] items-center justify-center">
      <div>

        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span className={`"absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]': 'w-0' }`} />
          <p className={!loading ? 'hidden' : ""}>Loading.....</p>
        </div>

{!isImageLoaded && 
        <div className="flex w-full max-w-xl text-sm p-0.5 mt-10 rounded-full">
        <input
         onChange={e => setInput(e.target.value)}
         value={input}
          type="text"
          name="text"
          placeholder="Imagine here..."
          autoComplete="off"
          className="flex-1 bg-transparent ml-8 max-sm:w-20 text-neutral-700 font-mono ring-1 ring-blue-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-black placeholder:opacity-50 rounded-full px-10 py-2 shadow-md focus:shadow-lg focus:shadow-blue-600"
          />
        <button type="submit" className=" flex bg-transparent rounded-full  text-neutral-700 font-mono ring-1 ring-blue-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50  px-1 py-2 ml-2 shadow-md focus:shadow-lg focus:shadow-blue-600 cursor-pointer hover:scale-105">
          Generate 
          <img src={assets.star_group} className="h-5" alt="" />
        </button>
          </div>
}
{isImageLoaded &&
          <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 ">
            <p onClick={()=>setIsImageLoaded(false)} className="bg-transparent border border-zinc-900 text-black px-8 py-3 cursor-pointer rounded-full ">Generate Another</p>
            <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"> Download </a>
            </div>
}
      </div>
    </motion.form>
  );
};

export default Result;
