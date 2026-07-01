import React, { useState } from 'react'
import shoppingImg from '../assets/online-shopping-app.png';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

 const navigate = useNavigate();
 
 const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:""
 });

 const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    
 }

 const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
        const res = await axios.post("/api/auth/login",formData,{withCredentials: true});
        console.log(res);
        
      toast.success(res.data.message);
        
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );
        
        setFormData({
            email: "",
            password: "",
            });

        const role = res.data.user.role;

        setTimeout(() => {
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }, 500);

        
    } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong...!!");
        setFormData({
            email: "",
            password: "",
            });
    }
 }

 return (
  <div className='min-h-screen w-full flex justify-center items-center p-4'>
    <div className='h-full md:h-5/4 w-full md:w-2/3 flex flex-col md:flex-row rounded-2xl bg-white text-slate-700 mt-15'>

      <div className='hidden md:flex md:w-1/2 flex-col justify-center p-14 rounded-2xl'>
        <div className='h-1/2 w-full text-slate-700'>
          <h1 className='text-4xl font-bold pb-3'>Welcome Back!</h1>
          <p>
            Discover thousands of products, exclusive deals, and fast
            checkout—all in one place.
          </p>
        </div>

        <div className='w-full flex justify-center'>
          <img
            src={shoppingImg}
            alt='Shopping Illustration'
            className='w-52 h-52 md:w-72 md:h-72 object-contain'
          />
        </div>
      </div>

      <div className='w-full  md:w-1/2 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 rounded-e-2xl'>

        <form
          className='w-full max-w-md px-6 py-10 md:px-8 md:py-0 flex flex-col justify-between h-5/6'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl font-bold text-slate-700 mb-3 text-center'>
              Sign In
            </h2>

            <input
              className='w-full bg-slate-200 backdrop-blur-sm p-3 rounded-2xl border border-white/20 outline-none placeholder:text-slate-500 focus:border-sky-500 transition'
              type='email'
              placeholder='Enter Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className='w-full bg-slate-200 backdrop-blur-sm p-3 rounded-2xl border border-white/20 outline-none placeholder:text-slate-500 focus:border-sky-500 transition'
              type='password'
              placeholder='Enter Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className='flex justify-between items-center text-sm p-1'>
              <label className='flex items-center gap-2 text-slate-500'>
                <input type='checkbox' />
                Remember me
              </label>

              <button
                type='button'
                className='text-blue-500 hover:text-blue-400'
              >
                Forgot Password?
              </button>
            </div>

            <button
              className='w-full bg-sky-500 text-white py-3 mt-2 rounded-2xl font-semibold hover:bg-sky-400 transition-all duration-75 active:scale-95'
              type='submit'
            >
              Login
            </button>

            <p className='text-center text-sm text-gray-500'>
              Don't have an account?{" "}
              <span
                className='text-blue-500 cursor-pointer ml-1'
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>

      </div>
    </div>
  </div>
);
}

export default Login