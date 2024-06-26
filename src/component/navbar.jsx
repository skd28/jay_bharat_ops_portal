import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from "../assets/jay_bhart_logo.jpeg";
import Cookies from 'js-cookie';


const Navbar = () => {
  const navigate = useNavigate()
  const goToLogin = () => {
    navigate('/')
    Cookies.remove("token");
  }
  return (
    <div className="flex flex-col bg-black  p-3 m-4 rounded-lg h-screen relative items-center">
      <div>
        <img  src={image} className=' w-[5rem] h-[5rem] m-auto   rounded-full' alt='...'/>
        {/* <div className='rounded-full xl:w-[7rem] xl:h-[7rem] lg:w-[8rem] lg:h-[8rem]  md:w-[7rem] md:h-[7rem] px-5 border bg-white mx-5 text-center my-10 '></div> */}
        <div className='my-10'>

          <div className='text-white text-center w-[6rem] mx-auto leading-5 font-inter '>
            <Link to='/jb_admin' >Client Management</Link>
          </div>
          <div className='text-white mx-auto text-center my-10 font-inter'>
            <Link to='/jb_admin/sample'>0:Sampling</Link>
          </div>

          {/* <div className='text-white text-center font-inter'>Profile Settings</div> */}
        </div>
      </div>
      <button className='absolute bottom-[24px] bg-red-700 text-white py-2 px-4 rounded-sm' onClick={()=>goToLogin()}>Logout</button>
    </div>
  );
};

export default Navbar;





