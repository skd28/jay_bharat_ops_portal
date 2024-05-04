import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import image from "../../assets/jay_bhart_logo.jpeg";
import Cookies from 'js-cookie';
import Loader from '../loader/Loader';





const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const naviagte = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  

  const handleSummit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    try {
      const response = await axios.post(
        "https://jaybharat-api.vercel.app/jb/auth/login",
        data
      );

      Cookies.set('token', response.data.data.token);
      setLoading(false); // Stop loading after successful login
      naviagte("/jb_admin");
    } catch (error) {
      setError("Login failed. Please check your username and password.");
      setLoading(false); // Stop loading if there's an error
    }
  };


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
                <button type="submit" className="flex w-full justify-center rounded-md gap-x-5 bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Login
                  {loading &&  <Loader />}
                  {/* <Link to='/jb_admin'>Login</Link> */}
                </button>
              </div>
            </form>

            {/* {error && <p className="text-red-500">{error}</p>} Display error message if login fails */}
          </div>

          {/* <Loader />  */}
        </div>
      </div>
      

  
    </>
  )
}

export default Login
