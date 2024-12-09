import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

dotenv.config();

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ success: true, token, user: { name: newUser.name } });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing Email or Password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get User Credits
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing User ID" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.error("Error in userCredits:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Razorpay Instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Razorpay Payment
const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let planDetails = {
      Basic: { credits: 10, amount: 10 },
      Advanced: { credits: 50, amount: 50 },
      Business: { credits: 5000, amount: 250 },
    };

    const selectedPlan = planDetails[planId];
    if (!selectedPlan) {
      return res.status(400).json({ success: false, message: "Invalid Plan" });
    }

    const { credits, amount } = selectedPlan;
    const transactionData = {
      userId,
      plan: planId,
      amount,
      credits,
      date: Date.now(),
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: process.env.CURRENCY,
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in paymentRazorpay:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const verifyRazorpay = async (req, res) => {

  try {
    
    const {razorpay_order_id} = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === "paid"){
      const transactionData = await transactionModel.findById(orderInfo.receipt)

       if(transactionData.payment) {
         return res.json({ success: false, message: "Payment Failed, Already Verified." });
       }

       const userData = await userModel.findById(transactionData.userId)
      
       const creditBalance = userData.creditBalance + transactionData.credits;
       await userModel.findByIdAndUpdate(userData._id , {creditBalance})

       await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})

       res.json({ success: true, message: "Credits Added"})
    }
    else {
      return res.json({ success: false, message: "Payment Failed, Not Paid." });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message:error.message });

    
  }
}

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };
