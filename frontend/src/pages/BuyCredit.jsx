import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';

const BuyCredit = () => {

  const {user, backendUrl, loadCreditData, token, setShowLogin} = useContext(AppContext);

  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'ArtFusion',
      description: 'Credits Plan',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data} = await axios.post(backendUrl + '/api/user/verify-razor', response, {headers: {token}})

          if(data.success){
            loadCreditData();
            navigate('/');
            toast.success('Credit Successfully Added!');
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open();
  }
  
  const paymentRazorpay = async (planId) => {

    try {
      if(!user){
        setShowLogin(true);
      }

      const {data} = await axios.post(backendUrl + '/api/user/pay-razor', {planId}, {headers: {token}})

      if(data.success) {
        initPay(data.order)
      }

    } catch (error) {
      
    }
  }

  return (
    <motion.div
    initial={{opacity:0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity:1, y: 0}}
    viewport={{once:true}}

    className="min-h-[80vh] text-center pt-14 mb-10 overflow-hidden">
      <button className="border border-blue-400 px-10 py-2 rounded-full mb-6 bg-gradient-to-r from-gray-50 to-blue-300">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left overflow-hidden">
        {plans.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-transparent shadow-lg border border-black rounded-lg py-8 px-6 text-neutral-800 hover:scale-95 transition-all duration-500 w-full max-w-[300px] sm:max-w-[250px] md:max-w-[280px]"
          >
            <img src={assets.Art_logo} width={90} alt="Logo" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">₹{item.price} </span>/ {item.credits} Credits
            </p>
            <button 
            onClick={()=>paymentRazorpay(item.id)}
            className="flex cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-5 py-2 mt-5 rounded-full border border-blue-600 hover:scale-105 duration-300 hover:text-blue-500 hover:border-blue-800 hover:from-black hover:to-blue-700">
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
