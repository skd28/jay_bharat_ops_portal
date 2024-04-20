import React, { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { SlMinus } from "react-icons/sl";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Navbar from '../navbar';

const Image = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleFormSubmit = () => {
        // Perform actions with the selected image, such as uploading to a server
        console.log("Selected image:", selectedImage);
    };

    return (
        <>
            <div className='flex'>
                {/* <Navbar /> */}
                <div className='mt-[4rem] ml-[3rem]  '>
                    <div className='flex items-center'>
                        <Link to='/jb_admin/sample'  >  <FaAngleLeft className='text-[1rem] border-2  w-[2rem] h-[2rem] rounded-full' /></Link>
                        <p className=' font-bold text-[1.4rem] px-4 font-inter'>Sampling </p>
                        <MdOutlineKeyboardArrowRight className=' text-[2.3rem]' />
                        <p className='font-bold text-[1.4rem] px-2 font-inter'>Create Sample</p>
                    </div>
                    <div className='flex gap-5 mt-16 px-5'>
                        <div className='  border py-10 px-7 font-inter rounded-lg h-[60rem] '>
                            {/* <p>Upload the sample image</p> */}
                            <input type="file"  placeholder="Upload the sample image" onChange={handleImageChange} />
                            {selectedImage && (
                                <img className='rounded-lg py-5' src={URL.createObjectURL(selectedImage)} alt='Sample' />
                            )}
                            {/* Rest of your code */}
                        </div>
                        <div>
                            {/* Rest of your code */}
                            {/* <div className='text-right my-3 mb-7'>
                                <Button className="bg-black font-inter w-[17rem]" onClick={handleFormSubmit}>Finalize and Submit</Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Image;
