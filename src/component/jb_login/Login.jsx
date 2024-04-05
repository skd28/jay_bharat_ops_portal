import axios from 'axios';
import React, { useState } from 'react'

import {useNavigate} from "react-router-dom"
import image from "../../assets/jay_bhart_logo.jpeg";




const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const naviagte = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  

  const handleSummit = async (e) =>{
    e.preventDefault();
  
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
      const response = await axios.post(
        "https://jaybharat-api.vercel.app/jb/auth/login",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // setClientData(response.data);
      naviagte("/jb_admin");
  
    } catch (error) {
      console.log("Login Failed" ,error.response.data.message);
    }
  }
  

  return (
    <>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  ">
       

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 shadow-xl  ">



             <img  src={image} className=' w-[6rem] h-[6rem] m-2   rounded-full' alt='...'/>

         <div className='m-8'>
         <form class="space-y-6" onSubmit={handleSummit} >
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div class="mt-2">
                <input  name="username" type="text" autocomplete="off"
                value={data.username} onChange={handleChange}
                class="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div class="mt-2">
                <input  name="password" type="password" autocomplete="off"  value={data.password} onChange={handleChange}
                class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                     Login
                {/* <Link to='/jb_admin'>Login</Link> */}
              </button>
            </div>
          </form>
         </div>


        </div>
      </div>


    </>
  )
}

export default Login
