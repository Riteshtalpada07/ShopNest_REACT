import React, { useState } from 'react'
import shoppingImg from '../assets/online-shopping-app.png';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    address:""
 });

 const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    
 }

 const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {

        const res = await axios.post("/api/auth/register",formData);
        console.log(res);
         
        toast.success(res.data.message);
        setFormData({
            username: "",
            email: "",
            password: "",
            role: "user",
            phone: "",
            address: ""
            });

        setTimeout(() => {
             navigate("/login")
        }, 500);

        
    } catch (error) {
        
         toast.error(error.response?.data?.message || "Something went wrong");

        setFormData({
            username: "",
            email: "",
            password: "",
            role: "user",
            phone: "",
            address: ""
            });
    }
 }

  return (
  <div className='min-h-screen w-full flex justify-center items-center text-slate-800 p-4'>
    <div className='h-full w-full md:h-1/2 md:w-2/3 flex flex-col md:flex-row rounded-2xl bg-white mt-15'>

      {/* Left Section */}
      <div className='hidden md:flex md:w-1/2 flex-col justify-center p-14 rounded-2xl'>
        <div className='h-1/2 w-full'>
          <h1 className='text-4xl font-bold pb-3'>Join Our Store</h1>
          <p className='text-slate-600'>
            Sign up today and start exploring thousands of products with a fast,
            secure, and personalized shopping experience.
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

      {/* Right Section */}
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-200 rounded-e-2xl text-slate-700 py-8'>

        <form
          className='w-full max-w-md px-6 md:px-8 flex flex-col gap-4'
          onSubmit={handleSubmit}
        >
          <h2 className='text-3xl font-bold text-slate-800 mb-3 text-center'>
            Sign Up
          </h2>

          <input
            className='w-full bg-slate-200 backdrop-blur-sm p-3 rounded-2xl border border-white/20 outline-none placeholder:text-slate-500 focus:border-sky-500 transition'
            type='text'
            placeholder='Enter Username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />

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

          <input
            className='w-full bg-slate-200 backdrop-blur-sm p-3 rounded-2xl border border-white/20 outline-none placeholder:text-slate-500 focus:border-sky-500 transition'
            type='tel'
            placeholder='Enter Phone Number'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className='flex flex-col md:flex-row gap-3 w-full justify-between'>
            <select
              className='w-full md:w-auto bg-slate-200 backdrop-blur-sm pl-2 pr-9 py-3 rounded-2xl border border-white/20 outline-none focus:border-sky-500 transition text-slate-500'
              name='role'
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>

            <input
              name='address'
              placeholder='Address'
              value={formData.address}
              onChange={handleChange}
              required
              className='w-full md:w-7/11 bg-slate-200 backdrop-blur-sm pl-2 py-3 rounded-2xl border border-white/20 outline-none placeholder:text-slate-500 focus:border-sky-500 transition'
            />
          </div>

          <button
            className='w-full bg-sky-500 text-white py-3 mt-2 rounded-2xl font-semibold hover:bg-sky-400 transition-all duration-75 active:scale-95'
            type='submit'
          >
            Create Account
          </button>

          <p className='text-center text-sm text-gray-600'>
            Already have an account?
            <span
              className='text-blue-500 cursor-pointer ml-1'
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
        </form>

      </div>
    </div>
  </div>
);
}

export default Register