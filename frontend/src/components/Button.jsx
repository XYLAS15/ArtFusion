import React,{useContext} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Button = () => {

  
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
    <div className='pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>

      <button
      onClick={() => onClickHandler()}
      className="inline-flex sm:text-lg gap-2 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black w-auto mt-5 px-12 py-2.5 items-center rounded-full border border-blue-600 hover:scale-125 duration-300 hover:text-blue-500 hover:border-blue-800 hover:from-black hover:to-blue-700">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </button>

    </div>
  )
}

export default Button