import React from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/jay_bhart_logo.jpeg"

const Navbar = () => {
  return (
    <div className="flex flex-col bg-black  m-4 rounded-lg h-screen ">
      <div>
      <img  src={image} className=' w-[7rem] h-[7rem] m-5   rounded-full' alt='...'/>
        {/* <div className='rounded-full xl:w-[7rem] xl:h-[7rem] lg:w-[8rem] lg:h-[8rem]  md:w-[7rem] md:h-[7rem] px-5 border bg-white mx-5 text-center my-10 '></div> */}
        <div className='my-10'>

          <div className='text-white text-center w-[5rem] mx-auto leading-5 font-inter'>
            <Link to='/jb_admin'>Client Management</Link>
          </div>
          <div className='text-white mx-auto text-center my-10 font-inter'>
            <Link to='/jb_admin/sample'>0:Sampling</Link>
          </div>

          <div className='text-white text-center font-inter'>Profile Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;





