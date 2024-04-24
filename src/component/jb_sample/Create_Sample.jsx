import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { SlMinus } from "react-icons/sl"


import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Navbar from '../navbar';

import { IoCloudUploadOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"
import axios from 'axios';



const Create_Sample = () => {

    const [payload, setPayload] = useState({
        sampling_number: null,
        sampling_image: null,
        sampling_client: 1,
        sampling_start_date: null,
        sampling_end_date: null,
        sampling_dispatch_date: null,
        sampling_cost: null,
        sampling_fabrics: [{ fabricQuality: '', fabricCost: '' }],
        sampling_embroidery: [{ embroidery_no: '', cost_embroidery: '', start_date: '', end_date: '' }],
        sampling_shiffly: [{ shiffly_number: '', cost_shiffly: '' }],
        sampling_hand_embroidery: [{ handembroidery_no: '', cost_handembroidery: '', start_date: '', end_date: '' }],
        sampling_chemical_lacing: [{ lacing_number: '', cost_lacing: '' }],
        sampling_stitching_count: null,
        sampling_stitching_cost: null,
        sampling_stitching_start_date: null,
        sampling_stitching_end_date: null,
        sampling_created_by: 5,
        sampling_updated_by: 5
    });
    const naviagte = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           //const token_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
          const token = Cookies.get('token');
          console.log("Cokiess  :",token);
          if(!token)
          {
            naviagte("/");
          }
            const response = await axios.post(
                "https://e9e3-103-166-189-130.ngrok-free.app/jb/sampling/create_sample",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
             console.log(response);
            // setShowAlert(true);
        } catch (error) {
            console.log("Error in open up");
        }
    };

    const setPayloadDate = (date, key) => {
        date = format(date, 'yyyy-MM-dd')
        // console.log(date,key);
        handleInputChange(key, date);
        // console.log("Date", payload)
    }
    // Function to update payload state based on input changes
    const handleInputChange = (key, value) => {
        setPayload(prevState => ({
            ...prevState,
            [key]: value
        }));


    };

    console.log("Payload :", payload);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Convert the image to base64 string
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPayload(prevState => ({
                    ...prevState,
                    sampling_image: base64String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInput = (section, key, value, index) => {
        setPayload(prevState => ({
            ...prevState,
            [section]: prevState[section].map((fabric, i) => {
                if (i === index) {
                    return {
                        ...fabric,
                        [key]: value
                    };
                }
                return fabric;
            })
        }));
    };

    const handleDelete = (index, section) => {
        setPayload(prevState => ({
            ...prevState,
            [section]: prevState[section].filter((_, i) => i !== index)
        }));
    };

    const addFabricForm = () => {
        setPayload(prevState => ({
            ...prevState,
            sampling_fabrics: [
                ...prevState.sampling_fabrics,
                { fabricQuality: '', fabricCost: '' }
            ]
        }));
    };

    const addEmbroidery = () => {
        setPayload(prevState => ({
            ...prevState,
            sampling_embroidery: [
                ...prevState.sampling_embroidery,
                { embroidery_no: '', cost_embroidery: '', start_date: '', end_date: '' }
            ]
        }));
    };

    const addShiffly = () => {
        setPayload(prevState => ({
            ...prevState,
            sampling_shiffly: [
                ...prevState.sampling_shiffly,
                { shiffly_number: '', cost_shiffly: '' }
            ]
        }));
    };

    const addHandEmbroidery = () => {
        setPayload(prevState => ({
            ...prevState,
            sampling_hand_embroidery: [
                ...prevState.sampling_hand_embroidery,
                { handembroidery_no: '', cost_handembroidery: '', start_date: '', end_date: '' }
            ]
        }));
    };

    const addLancing = () => {
        setPayload(prevState => ({
            ...prevState,
            sampling_chemical_lacing: [
                ...prevState.sampling_chemical_lacing,
                { lacing_number: '', cost_lacing: '' }
            ]
        }));
    };

    const setMultiFormDate = (date, key, section, index) => {
        date = format(date, 'yyyy-MM-dd');
        setPayload(prevState => ({
            ...prevState,
            [section]: prevState[section].map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [key]: date
                    };
                }
                return item;
            })
        }));
    };

    return (
        <>
            <div className='flex'>
                <Navbar />

                <div className='mt-[4rem] ml-[3rem]  '>

                    <div className='flex items-center'>
                        <Link to='/jb_admin/sample'  >  <FaAngleLeft className='text-[1rem] border-2  w-[2rem] h-[2rem] rounded-full' /></Link>
                        <p className=' font-bold text-[1.4rem] px-4 font-inter'>Sampling </p>
                        <MdOutlineKeyboardArrowRight className=' text-[2.3rem]' />
                        <p className='font-bold text-[1.4rem] px-2 font-inter'>Create Sample</p>
                    </div>

                    <div className='flex gap-5 mt-16 px-5'>
                        <div className='  border py-10 px-7 font-inter rounded-lg h-[60rem] '>

                            <div className="border-2 border-black font-inter rounded-lg border-dotted h-[4rem] flex items-center justify-center">
                                <label htmlFor="sampleImage" className="cursor-pointer flex items-center ">
                                    <span className='px-2'>
                                        <IoCloudUploadOutline className=' ' />
                                    </span>

                                    Upload sample image
                                </label>
                                <input
                                    id="sampleImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div >
                                {payload.sampling_image && (
                                    <img src={payload.sampling_image} alt="Image" className="mt-4 rounded-lg  w-[12rem] h-[12rem]  " />
                                )}
                            </div>

                            <div className='mt-5'>
                                <p className='font-inter'>Sample Number</p>
                                <Input className=" my-3 w-[13rem] " placeholder=" Enter sample no" type="text" value={payload.sampling_number || ''} onChange={e => handleInputChange('sampling_number', e.target.value)} />
                                <p className='font-inter'>Client Code</p>
                                <Input className=" my-3 w-[13rem] " placeholder="Eg:SW_CL_001" />
                                <p className='font-inter mb-3'>Start date of Sampling</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[13rem] justify-start text-left font-normal",
                                                !payload.sampling_start_date
                                                && "text-muted-foreground"
                                            )}
                                        >
                                            {/* {console.log(start_date)} */}
                                            <CalendarIcon className="mr-2 h-4 w-4" />

                                            {payload.sampling_start_date ? format(new Date(payload.sampling_start_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={payload.sampling_start_date}

                                            onSelect={(date, key) => setPayloadDate(date, "sampling_start_date")}

                                            // onSelect={e => handleInputChange('sampling_start_date', e.target.value)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <p className='font-inter my-3'>End date of Sampling</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[13rem] justify-start text-left font-normal",
                                                !payload.sampling_end_date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {payload.sampling_end_date ? format(new Date(payload.sampling_end_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={payload.sampling_end_date}

                                            onSelect={(date, key) => setPayloadDate(date, "sampling_end_date")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <p className='font-inter  my-3'>Date of Dispatch</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[13rem] justify-start text-left font-normal",
                                                !payload.sampling_dispatch_date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {payload.sampling_dispatch_date ? format(new Date(payload.sampling_dispatch_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={payload.sampling_dispatch_date}
                                            onSelect={(date, key) => setPayloadDate(date, "sampling_dispatch_date")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                        </div>
                        <div >
                            <div className='border-2   pt-12  pl-5 rounded-lg py-8'>


                                <div className='flex items-center'>
                                    <p className=' font-medium w-[7rem] font-inter '>Cost of the Sample</p>
                                    <Input className="xl:w-[15rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2  " placeholder="Enter in Rs." type="number"  value={payload.sampling_cost || ''} onChange={e => handleInputChange('sampling_cost', parseFloat(e.target.value))} />
                                </div>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 font-inter'>Fabrics</h1>


                                {payload.sampling_fabrics.map((form, index) => (
                                    <div key={index}>
                                        <div className='flex items-center'>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[9rem]  font-inter'>Select Fabric quality</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 "
                                                        placeholder="Add value"
                                                        type="text"
                                                        value={form.fabricQuality}
                                                        onChange={(e) => handleInput('sampling_fabrics', 'fabricQuality', e.target.value, index)}
                                                    />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter '>Cost of  Fabrics</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                        placeholder="Add value"
                                                        type="text"
                                                        value={form.fabricCost}
                                                        onChange={(e) => handleInput('sampling_fabrics', 'fabricCost', e.target.value, index)}
                                                    />
                                                </div>
                                            </div>
                                            {index !== 0 && (
                                                <SlMinus
                                                    onClick={() => handleDelete(index, 'sampling_fabrics')}
                                                    className=" text-[1.3rem] mr-4 "
                                                />
                                            )}
                                            {index === 0 && (
                                                <div className='mr-[2.1rem]'></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addFabricForm}>Add Fabric</Button>


                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter '>Embroidery</h1>
                                {payload.sampling_embroidery.map((form, index) => (
                                    <div key={index} >
                                        <div className='grid grid-cols-2  w-[40rem] '>
                                            <div className='flex items-center'>
                                                <p className='font-medium  w-[6rem]  '>Embroidery No.</p>
                                                <Input
                                                    className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                    placeholder="Add value"
                                                    type="text"
                                                    value={form.embroidery_no}
                                                    onChange={(e) => handleInput('sampling_embroidery', 'embroidery_no', e.target.value, index)}
                                                />

                                            </div>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>Cost of Embroidery</p>
                                                <Input
                                                    className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                    placeholder="Add value"
                                                    type="text"
                                                    value={form.cost_embroidery}
                                                    onChange={(e) => handleInput('sampling_embroidery', 'cost_embroidery', e.target.value, index)}
                                                />

                                            </div>
                                        </div>
                                        <div className='flex items-center '>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] '>Start Date</p>
                                                    <Popover  >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "xl:w-[14rem] lg:w-[10rem] relative right-3 justify-start text-left font-normal ",
                                                                    !payload.sampling_embroidery[index].start_date
                                                                    && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {/* {console.log("Sample Date ",payload.sampling_embroidery[0].start_date )} */}
                                                                {payload.sampling_embroidery[index].start_date ? format(new Date(payload.sampling_embroidery[index].start_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={payload.sampling_embroidery[index].start_date}

                                                                onSelect={(date) => setMultiFormDate(date, "start_date", "sampling_embroidery", index)}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]'>End Date</p>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "xl:w-[14rem] lg:w-[10rem] relative right-3 justify-start text-left font-normal",
                                                                    !payload.sampling_embroidery[index].end_date
                                                                    && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {/* {console.log("Sample Date ",payload.sampling_embroidery[0].start_date )} */}
                                                                {payload.sampling_embroidery[index].end_date ? format(new Date(payload.sampling_embroidery[index].end_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={payload.sampling_embroidery[index].end_date}

                                                                onSelect={(date) => setMultiFormDate(date, "end_date", "sampling_embroidery", index)}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                            {index !== 0 && (
                                                <SlMinus onClick={() => handleDelete(index, 'sampling_embroidery')} className="text-[1.3rem] mr-4" />

                                            )}
                                            {index === 0 && (
                                                <div className='mr-[2.1rem]'></div>

                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addEmbroidery}>Add Embroidery</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter '>Shiffly</h1>
                                {payload.sampling_shiffly.map((form, index) => (
                                    <div key={index} >
                                        <div className='flex items-center '>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]  font-inter'>Shiffly number</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                        placeholder="Add value"
                                                        type="text"
                                                        value={form.shiffly_number}
                                                        onChange={(e) => handleInput('sampling_shiffly', 'shiffly_number', e.target.value, index)}
                                                    />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter '>Cost of Shiffly</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                        placeholder="Add value"
                                                        type="text"
                                                        value={form.cost_shiffly}
                                                        onChange={(e) => handleInput('sampling_shiffly', 'cost_shiffly', e.target.value, index)}
                                                    />
                                                </div>
                                            </div>


                                            {index !== 0 && (
                                                <SlMinus onClick={() => handleDelete(index, 'sampling_shiffly')} className=" text-[1.3rem] mr-4 " />
                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] mt-6 font-inter" onClick={addShiffly}>Add Shiffly</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter'>Hand Embroidery</h1>
                                {payload.sampling_hand_embroidery.map((form, index) => (
                                    <div key={index} >
                                        <div className='grid grid-cols-2  w-[40rem] '>
                                            <div className='flex items-center'>
                                                <p className='font-medium  w-[6rem] '>Embroidery No.</p>
                                                <Input
                                                    className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                    placeholder="Add value"
                                                    type="text"
                                                    value={form.handembroidery_no}
                                                    onChange={(e) => handleInput('sampling_hand_embroidery', 'handembroidery_no', e.target.value, index)}
                                                />
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>Cost of Embroidery</p>
                                                <Input
                                                    className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                    placeholder="Add value"
                                                    type="text"
                                                    value={form.cost_handembroidery}
                                                    onChange={(e) => handleInput('sampling_hand_embroidery', 'cost_handembroidery', e.target.value, index)}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-center   '>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] '>Start Date</p>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "xl:w-[14rem] lg:w-[10rem] relative right-3 justify-start text-left font-normal",
                                                                    !payload.sampling_hand_embroidery[index].start_date
                                                                    && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {/* {console.log("Sample Date ",payload.sampling_embroidery[0].start_date )} */}
                                                                {payload.sampling_hand_embroidery[index].start_date ? format(new Date(payload.sampling_hand_embroidery[index].start_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={payload.sampling_hand_embroidery[index].start_date}

                                                                onSelect={(date) => setMultiFormDate(date, "start_date", "sampling_hand_embroidery", index)}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]'>End Date</p>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "xl:w-[14rem] lg:w-[10rem] relative right-3 justify-start text-left font-normal",
                                                                    !payload.sampling_hand_embroidery[index].start_date
                                                                    && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {/* {console.log("Sample Date ",payload.sampling_embroidery[0].start_date )} */}
                                                                {payload.sampling_hand_embroidery[index].end_date ? format(new Date(payload.sampling_hand_embroidery[index].end_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={payload.sampling_hand_embroidery[index].end_date}

                                                                onSelect={(date) => setMultiFormDate(date, "end_date", "sampling_hand_embroidery", index)}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                            {index !== 0 && (
                                                <SlMinus onClick={() => handleDelete(index, 'sampling_hand_embroidery')} className=" text-[1.3rem] mr-4 " />
                                            )}
                                            {index === 0 && (
                                                <div className='mr-[2.1rem]'></div>

                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addHandEmbroidery}>Add Hand Embroidery</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Chemical Lacing</h1>

                                {payload.sampling_chemical_lacing.map((form, index) => (
                                    <div key={index} >
                                        <div className='flex items-center'>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]  font-inter '>Lacing number</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 "
                                                        placeholder="Add value"
                                                        type="text"
                                                        value={form.lacing_number}
                                                        onChange={(e) => handleInput('sampling_chemical_lacing', 'lacing_number', e.target.value, index)}
                                                    />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter  '>Cost of Lacing</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 "
                                                        placeholder="Add value"
                                                        type="text"
                                                        value={form.cost_lacing}
                                                        onChange={(e) => handleInput('sampling_chemical_lacing', 'cost_lacing', e.target.value, index)}
                                                    />
                                                </div>
                                            </div>
                                            {index !== 0 && (
                                                <SlMinus onClick={() => handleDelete(index, 'sampling_chemical_lacing')} className=" text-[1.3rem] mr-4 " />
                                            )}

                                            {index === 0 && (
                                                <div className='mr-[2.1rem]'></div>

                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] mt-6 font-inter" onClick={addLancing}>Add Chemical Lacing</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter '>Stiching</h1>
                                <div className='grid grid-cols-2 w-[40rem]'>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem] font-inter '>Enter Stiching count</p>
                                        <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" type="number" value={payload.sampling_stitching_count || ''} onChange={e => handleInputChange('sampling_stitching_count', parseInt(e.target.value))} />
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem]  font-inter'>Cost of Stiching</p>
                                        <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" type="number"  value={payload.sampling_stitching_cost || ''} onChange={e => handleInputChange('sampling_stitching_cost', parseFloat(e.target.value))} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 w-[40rem]'>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem] font-inter '>Start Date</p>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "xl:w-[12rem] lg:w-[8rem] relative right-3 justify-start text-left font-normal",
                                                        !payload.sampling_stitching_start_date
                                                        && "text-muted-foreground"
                                                    )}
                                                >

                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                    {payload.sampling_stitching_start_date ? format(new Date(payload.sampling_stitching_start_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={payload.sampling_stitching_start_date}

                                                    onSelect={(date, key) => setPayloadDate(date, "sampling_stitching_start_date")}


                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem] font-inter '>End Date</p>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "xl:w-[12rem] lg:w-[8rem] relative right-3 justify-start text-left font-normal",
                                                        !payload.sampling_stitching_end_date
                                                        && "text-muted-foreground"
                                                    )}
                                                >
                                                    {/* {console.log(start_date)} */}
                                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                                    {payload.sampling_stitching_end_date ? format(new Date(payload.sampling_stitching_end_date), 'yyyy-MM-dd') : <span>Pick a date</span>} ;
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={payload.sampling_stitching_end_date}

                                                    onSelect={(date, key) => setPayloadDate(date, "sampling_stitching_end_date")}


                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className='text-right my-3 mb-7'>
                                <Button    onClick={handleSubmit}   className="bg-black font-inter w-[17rem]">Finalize and Summit</Button>
                            </div>
                        </div>



                    </div>

                </div >
            </div>

        </>
    )
}

export default Create_Sample









// const [fabricForms, setFabricForms] = useState([{  fabricQuality: "", fabricCost: "" }]);

//     const [EmbroideryForm, setEmbroideryForm] = useState([{ id: 1 }]);
//     const [ShifflyForm, setShifflyForm] = useState([{ id: 1 }]);
//     const [ChemicalLancingForm, setChemicalLancingForm] = useState([{ id: 1 }]);
//     const [HandEmbroideryForm, setHandEmbroideryForm] = useState([{ id: 1 }]);

//     const handleFabricQualityChange = (index, value) => {
//         const updatedForms = [...fabricForms];
//         updatedForms[index].fabricQuality = value;

//         setFabricForms(updatedForms);

//         console.log("Update data :", fabricForms);
//     };

//     const handleFabricCostChange = (index, value) => {
//         const updatedForms = [...fabricForms];
//         updatedForms[index].fabricCost = value;
//         setFabricForms(updatedForms);
//     };

//     const addFabricForm = () => {
//         const newId = fabricForms.length + 1;
//         setFabricForms([...fabricForms, { id: newId }]);
//     };

//     const handleDeleteFabricForm = (index) => {
//         const updatedForms = [...fabricForms];
//         updatedForms.splice(index, 1);
//         setFabricForms(updatedForms);
//     };

//     const addEmbroideryForm = () => {
//         const newId = EmbroideryForm.length + 1;
//         setEmbroideryForm([...EmbroideryForm, { id: newId }]);
//     };

//     const deleteEmbroideryForm = (id) => {
//         setEmbroideryForm(EmbroideryForm.filter(form => form.id !== id));
//     };

//     const addShifflyForm = () => {
//         const newId = ShifflyForm.length + 1;
//         setShifflyForm([...ShifflyForm, { id: newId }]);
//     };

//     const deleteShifflyForm = (id) => {
//         setShifflyForm(ShifflyForm.filter(form => form.id !== id));
//     };

//     const addHandEmbroideryForm = () => {
//         const newId = HandEmbroideryForm.length + 1;
//         setHandEmbroideryForm([...HandEmbroideryForm, { id: newId }]);
//     };

//     const deleteHandEmbroideryForm = (id) => {
//         setHandEmbroideryForm(HandEmbroideryForm.filter(form => form.id !== id));
//     };

//     const addChemicalLancingForm = () => {
//         const newId = ChemicalLancingForm.length + 1;
//         setChemicalLancingForm([...ChemicalLancingForm, { id: newId }]);
//     };

//     const deleteChemicalLancingForm = (id) => {
//         setChemicalLancingForm(ChemicalLancingForm.filter(form => form.id !== id));
//     };
{/* {payload.sampling_fabrics.map((form, index) => (
                                    <div key={index}>
                                        <div className='flex items-center'>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[9rem]  font-inter'>Select Fabric quality</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 "
                                                        placeholder="Add value"
                                                        type="text"
                                                        // value={form.fabricQuality}
                                                        // onChange={(e) => handleFabricQualityChange(index, e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter '>Cost of  Fabrics</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                        placeholder="Add value"
                                                        type="text"
                                                        // value={form.fabricCost}
                                                        // onChange={(e) => handleFabricCostChange(index, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {index !== 0 && (
                                                <SlMinus 
                                               // onClick={() => handleDeleteFabricForm(index)} 
                                                className=" text-[1.3rem] mr-4 " />
                                            )}
                                            {index === 0 && (
                                                <div className='mr-[2.1rem]'></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addFabricForm}>Add Fabric</Button> */}

// const handleInputLacing = (key, value, index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_chemical_lacing: prevState.sampling_chemical_lacing.map((fabric, i) => {
//             if (i === index) {
//                 return {
//                     ...fabric,
//                     [key]: value
//                 };
//             }
//             return fabric;
//         })
//     }));
// };



// const deleteLancing = (index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_chemical_lacing: prevState.sampling_chemical_lacing.filter((_, i) => i !== index)
//     }));
// };


// const handleDeleteFabricForm = (index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_fabrics: prevState.sampling_fabrics.filter((_, i) => i !== index)
//     }));
// };
// const handleInputhandembroidery = (key, value, index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_hand_embroidery: prevState.sampling_hand_embroidery.map((embroidery, i) => {
//             if (i === index) {
//                 return {
//                     ...embroidery,
//                     [key]: value
//                 };
//             }
//             return embroidery;
//         })
//     }));
// };


// const deleteHandEmbroidery = (index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_hand_embroidery: prevState.sampling_hand_embroidery.filter((_, i) => i !== index)
//     }));
// };
// const handleInputShiffly = (key, value, index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_shiffly: prevState.sampling_shiffly.map((fabric, i) => {
//             if (i === index) {
//                 return {
//                     ...fabric,
//                     [key]: value
//                 };
//             }
//             return fabric;
//         })
//     }));
// };



// const deleteShiffly = (index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_shiffly: prevState.sampling_shiffly.filter((_, i) => i !== index)
//     }));
// };

// const handleInputEmbroidery = (key, value, index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_embroidery: prevState.sampling_embroidery.map((embroidery, i) => {
//             if (i === index) {
//                 return {
//                     ...embroidery,
//                     [key]: value
//                 };
//             }
//             return embroidery;
//         })
//     }));
// };


// const deleteEmbroidery = (index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         sampling_embroidery: prevState.sampling_embroidery.filter((_, i) => i !== index)
//     }));
// };

// const handleInput = (section, key, value, index) => {
//     setPayload(prevState => ({
//         ...prevState,
//         section: prevState.section.map((fabric, i) => {
//             if (i === index) {
//                 return {
//                     ...fabric,
//                     [key]: value
//                 };
//             }
//             return fabric;
//         })
//     }));
// };



{/* <div className='mt-[3rem]w-[18rem] rounded-md   grid grid-cols-4  '>
{data.map((item,indx)=>(
  <img src={item.sampling_image} alt='....' className=' w-[12rem] h-[12rem]  m-5 ' />
  <h1></h1>
))}
</div> */}