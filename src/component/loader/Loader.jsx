import React from 'react';
import animation from '../loader/animation.svg'

const Loader = () => {
  return (
    <>
    <img className=' bg-black  rounded-full w-[1.5rem]'  src={animation} alt='...'/>
    </>
  );
};

export default Loader;
