import React from "react";
import { assets } from "../assets/assets";
import {motion} from "framer-motion"
const Description = () => {
  return (
    <motion.div
    initial={{opacity: 0, y:200}}
    transition={{duration: 1.5}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}

    className="flex flex-col items-center justify-center my-24 p-6 md:px-28 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your Imagination into Visuals</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <motion.img
        initial={{opacity:0, x:-200}}
        whileInView={{opacity:1, x:0}}
        transition={{duration: 0.8}}
        viewport={{once:true}}

          src={assets.sample_img_3}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">Unleashing the AI-Powered text to Image Generator</h2>
          <p className="text-gray-700 mb-4">
            ArtFusion's state-of-the-art AI-powered text-to-image generator
            transforms your ideas into stunning, high-quality visuals in just
            seconds. Simply type in your text, choose a style, and let the magic
            of AI bring your imagination to life. Whether it’s a vivid product
            design, a detailed character portrait, or an entirely new concept,
            our technology effortlessly bridges the gap between your vision and
            reality. Imagine it, describe it, and watch as your creativity takes
            shape. 
          </p>
          <p className="text-gray-700">
          From artistic masterpieces to functional prototypes, our
            generator adapts to your needs, offering unparalleled precision and
            uniqueness. Explore infinite possibilities, visualize the
            unimaginable, and transform your creative process with ease.
            ArtFusion makes creation effortless and limitless—type, create, and
            amaze the world with just a few clicks. The future of visual
            storytelling starts here!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
