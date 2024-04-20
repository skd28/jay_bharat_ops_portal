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

const try_sample = () => {
    const [date, setDate] = React.useState();
    const [fabricForms, setFabricForms] = useState([{ id: 1, fabricQuality: "", fabricCost: "" }]);
    
    const handleFabricQualityChange = (index, value) => {
        const updatedForms = [...fabricForms];
        updatedForms[index].fabricQuality = value;

        setFabricForms(updatedForms);

        console.log("Update data :",fabricForms);
    };

    const handleFabricCostChange = (index, value) => {
        const updatedForms = [...fabricForms];

        updatedForms[index].fabricCost = value;
        setFabricForms(updatedForms);
    };

    const addFabricForm = () => {
        const newId = fabricForms.length + 1;
        setFabricForms([...fabricForms, { id: newId, fabricQuality: "", fabricCost: "" }]);
    };

    const deleteFabricForm = (id) => {
        setFabricForms(fabricForms.filter(form => form.id !== id));
    };

    return (
        <>
            <div className='flex'>
                <Navbar />
                <div className='mt-[4rem] ml-[3rem]  '>
                    <div className='flex items-center'>
                        <Link to='/jb_admin/sample'>
                            <FaAngleLeft className='text-[1rem] border-2  w-[2rem] h-[2rem] rounded-full' />
                        </Link>
                        <p className=' font-bold text-[1.4rem] px-4 font-inter'>Sampling </p>
                        <MdOutlineKeyboardArrowRight className=' text-[2.3rem]' />
                        <p className='font-bold text-[1.4rem] px-2 font-inter'>Create Sample</p>
                    </div>
                    <div className='flex gap-5 mt-16 px-5'>
                        <div className='  border py-10 px-7 font-inter rounded-lg h-[60rem] '>
                            <p>Upload the sample image</p>
                            <img className='rounded-lg py-5  ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-4UrNveMngjY3HyNG5922XI7nzIudTijew&usqp=CAU' alt='...' />
                            <div className="border-2 border-black font-inter rounded-lg border-dotted  h-[8rem] flex items-center justify-center">
                                Upload sample image
                            </div>
                            <div className='mt-5'>
                                <p className='font-inter'>Sample Number</p>
                                <Input className=" my-3 w-[13rem] " placeholder=" Enter sample no" />
                                <p className='font-inter'>Client Code</p>
                                <Input className=" my-3 w-[13rem] " placeholder="Eg:SW_CL_001" />
                                <p className='font-inter mb-3'>Start date of Sampling</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[13rem] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                {/* other fields */}

                            </div>
                        </div>
                        <div >
                            <div className='border-2   pt-12  pl-5 rounded-lg py-8'>
                                {/* other fields */}
                                <h1 className='underline font-semibold text-[1.2rem] my-4 font-inter'>Fabrics</h1>
                                {fabricForms.map((form, index) => (
                                    <div key={form.id}>
                                        <div className='flex items-center'>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[9rem]  font-inter'>Select Fabric quality</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 "
                                                        placeholder="Add value"
                                                        value={form.fabricQuality}
                                                        onChange={(e) => handleFabricQualityChange(index, e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter '>Cost of  Fabrics</p>
                                                    <Input
                                                        className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3"
                                                        placeholder="Add value"
                                                        value={form.fabricCost}
                                                        onChange={(e) => handleFabricCostChange(index, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {form.id !== 1 && (
                                                <SlMinus onClick={() => deleteFabricForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                            )}
                                            {form.id === 1 && (
                                                <div className='mr-[2.1rem]'></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addFabricForm}>Add Fabric</Button>
                                {/* other fields */}
                            </div>
                            <div className='text-right my-3 mb-7'>
                                <Button className="bg-black font-inter w-[17rem]">Finalize and Summit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default try_sample;