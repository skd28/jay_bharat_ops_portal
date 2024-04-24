import axios from 'axios';
import React, { useState } from 'react'

import { useNavigate } from "react-router-dom"
import image from "../../assets/jay_bhart_logo.jpeg";
import Cookies from 'js-cookie';





const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const naviagte = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSummit = async (e) => {
    e.preventDefault();

    try {
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
      const response = await axios.post(
        "https://jaybharat-api.vercel.app/jb/auth/login",
        data
      );
      // Log token value
      // console.log(response);
      // console.log("Token:", response.data.data.token);

      // Set token in cookies
      Cookies.set('token', response.data.data.token);

      // Log the token from cookies
      // console.log("Token from cookies:", Cookies.get('token'));

      naviagte("/jb_admin");

    } catch (error) {
      console.log("Login Failed", error);
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  ">


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 shadow-xl  ">



          <img src={image} className=' w-[6rem] h-[6rem] m-2   rounded-full' alt='...' />

          <div className='m-8'>
            <form className="space-y-6" onSubmit={handleSummit} >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div className="mt-2">
                  <input name="username" type="text" autoComplete="off"
                    value={data.username} onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input name="password" type="password" autoComplete="off" value={data.password} onChange={handleChange}
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
