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
import Image from './Image';


const Create_Sample = () => {

    const [start_date, setDate] = React.useState(null);
    const [end_date, setEnd_date] = React.useState(null);
    const [dispath_date, setDispath_date] = React.useState(null);

   

    const payload_arch = {
        'sampling_number':null,
        'sampling_image':null,
        'sampling_client':1,
        'sampling_start_date':start_date,
        'sampling_end_date':end_date,
        'sampling_dispatch_date':dispath_date,
        'sampling_cost':null,
        'sampling_fabrics':[],
        'sampling_embroidery':[],
        'sampling_shiffly':[],
        'sampling_hand_embroidery':[],
        'sampling_chemical_lacing':[],
        'sampling_stitching_count':null,
        'sampling_stitching_cost':null,
        'sampling_stitching_start_date':null,
        'sampling_stitching_end_date':null,
        'sampling_created_by':5,
        'sampling_updated_by':5
    }

    const [payload, setPayload] = useState({
        sampling_number: null,
        sampling_image: null,
        sampling_client: 1,
        sampling_start_date: start_date,
        sampling_end_date: end_date,
        sampling_dispatch_date: dispath_date,
        sampling_cost: null,
        sampling_fabrics: [],
        sampling_embroidery: [],
        sampling_shiffly: [],
        sampling_hand_embroidery: [],
        sampling_chemical_lacing: [],
        sampling_stitching_count: null,
        sampling_stitching_cost: null,
        sampling_stitching_start_date: null,
        sampling_stitching_end_date: null,
        sampling_created_by: 5,
        sampling_updated_by: 5
    });

    // Function to update payload state based on input changes
    const handleInputChange = (key, value) => {
        setPayload(prevState => ({
            ...prevState,
            [key]: value
        }));

        // Additional operations based on the key can be performed here
        // For example, updating dispatch date when start date changes
        if (key === 'sampling_start_date') {
            setPayload(prevState => ({
                ...prevState,
                sampling_dispatch_date: value // Update dispatch date accordingly
            }));
        }

        
    };

    console.log("Payload :",payload);

    
    useEffect(()=>{
        if(start_date)
           {
            setPayload({...payload,sampling_start_date:start_date})
           }
    },[start_date]);

    
    useEffect(()=>{
        if(end_date)
           {
            setPayload({...payload, sampling_end_date:end_date})
           }
    },[end_date]);

    useEffect(()=>{
        if(dispath_date)
           {
            setPayload({...payload, sampling_dispatch_date:dispath_date})
           }
    },[dispath_date]);




    
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
                            <p>Upload the sample image</p>
                            <img className='rounded-lg py-5' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-4UrNveMngjY3HyNG5922XI7nzIudTijew&usqp=CAU' alt='...' />
                            <div className="border-2 border-black font-inter rounded-lg border-dotted  h-[8rem] flex items-center justify-center">
                                Upload sample image
                            </div>
                            <div className='mt-5'>
                                <p className='font-inter'>Sample Number</p>
                                <Input className=" my-3 w-[13rem] " placeholder=" Enter sample no" type="text"  value={payload.sampling_number || ''}   onChange={e => handleInputChange('sampling_number', e.target.value)} />
                                <p className='font-inter'>Client Code</p>
                                <Input className=" my-3 w-[13rem] " placeholder="Eg:SW_CL_001"   />
                                <p className='font-inter mb-3'>Start date of Sampling</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[13rem] justify-start text-left font-normal",
                                                !start_date
                                                && "text-muted-foreground"
                                            )}
                                        >
                                            {/* {console.log(start_date)} */}
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={start_date}
                                           
                                            onSelect={setDate}
                                           
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
                                                !end_date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {/* //{date ? format(date, "PPP") : <span>Pick a date</span>} */}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={end_date}
                                            onSelect={setEnd_date}
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
                                                !dispath_date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dispath_date}
                                            onSelect={setDispath_date}
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
                                    <Input className="xl:w-[15rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2  " placeholder="Enter in Rs." type="text"   value={payload. sampling_cost || ''}   onChange={e => handleInputChange('sampling_cost', e.target.value)} />
                                </div>

                                {/* <h1 className='underline font-semibold text-[1.2rem] my-4 font-inter'>Fabrics</h1> */}
                                {/* {fabricForms.map((form, index) => (
                                    <div key={index}>
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
                                            {index !== 0 && (
                                                <SlMinus onClick={() => handleDeleteFabricForm(index)} className=" text-[1.3rem] mr-4 " />
                                            )}
                                            {index === 0 && (
                                                <div className='mr-[2.1rem]'></div>
                                            )}
                                        </div>
                                    </div>
                                ))} */}
                                {/* <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addFabricForm}>Add Fabric</Button> */}


{/* 

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter '>Embroidery</h1>
                                {EmbroideryForm.map((form, index) => (
                                    <div key={form.id} >
                                        <div className='grid grid-cols-2  w-[40rem] '>
                                            <div className='flex items-center'>
                                                <p className='font-medium  w-[6rem]  '>Embroidery No.</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 " placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>Cost of Embroidery</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3" placeholder="Add value" />
                                            </div>
                                        </div>
                                        <div className='flex items-center '>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] '>Start Date</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 " placeholder="Add value" />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]'>End Date</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3" placeholder="Add value" />
                                                </div>
                                            </div>
                                            {form.id !== 1 && (
                                                <SlMinus onClick={() => deleteEmbroideryForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                            )}
                                            {form.id === 1 && (
                                                <div className='mr-[2.1rem]'></div>

                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addEmbroideryForm}>Add Embroidery</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter '>Shiffly</h1>
                                {ShifflyForm.map((form, index) => (
                                    <div key={form.id} >
                                        <div className='flex items-center '>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]  font-inter'>Shiffly number</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 " placeholder="Add value" />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter '>Cost of Shiffly</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3" placeholder="Add value" />
                                                </div>
                                            </div>


                                            {form.id !== 1 && (
                                                <SlMinus onClick={() => deleteShifflyForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] mt-6 font-inter" onClick={addShifflyForm}>Add Shiffly</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter'>Hand Embroidery</h1>
                                {HandEmbroideryForm.map((form, index) => (
                                    <div key={form.id} >
                                        <div className='grid grid-cols-2  w-[40rem] '>
                                            <div className='flex items-center'>
                                                <p className='font-medium  w-[6rem] '>Embroidery No.</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 " placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>Cost of Embroidery</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3" placeholder="Add value" />
                                            </div>
                                        </div>
                                        <div className='flex items-center   '>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] '>Start Date</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 " placeholder="Add value" />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]'>End Date</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3" placeholder="Add value" />
                                                </div>
                                            </div>
                                            {form.id !== 1 && (
                                                <SlMinus onClick={() => deleteHandEmbroideryForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                            )}
                                            {form.id === 1 && (
                                                <div className='mr-[2.1rem]'></div>

                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] font-inter mt-6" onClick={addHandEmbroideryForm}>Add Hand Embroidery</Button>

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Chemical Lacing</h1>

                                {ChemicalLancingForm.map((form, index) => (
                                    <div key={form.id} >
                                        <div className='flex items-center'>
                                            <div className='grid grid-cols-2 w-[40rem] '>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem]  font-inter '>Lacing number</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3 " placeholder="Add value" />
                                                </div>
                                                <div className='flex items-center'>
                                                    <p className='font-medium w-[7rem] font-inter  '>Cost of Lacing</p>
                                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 mx-3" placeholder="Add value" />
                                                </div>
                                            </div>
                                            {form.id !== 1 && (
                                                <SlMinus onClick={() => deleteChemicalLancingForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button className="bg-black w-[15rem] mt-6 font-inter" onClick={addChemicalLancingForm}>Add Chemical Lacing</Button> */}

                                <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 font-inter '>Stiching</h1>
                                <div className='grid grid-cols-2 w-[40rem]'>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem] font-inter '>Enter Stiching count</p>
                                        <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" type="text"  value={payload. sampling_stitching_count || ''}   onChange={e => console.log('sampling_cost', e.target.value)}  />
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem]  font-inter'>Cost of Stiching</p>
                                        <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value"  value={payload. sampling_stitching_cost || ''}   onChange={e => handleInputChange('sampling_cost', e.target.value)} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 w-[40rem]'>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem] font-inter '>Start Date</p>
                                        <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='font-medium   w-[7rem] font-inter '>End Date</p>
                                        <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                    </div>
                                </div> 
                            </div>

                            <div className='text-right my-3 mb-7'>
                                <Button className="bg-black font-inter w-[17rem]">Finalize and Summit</Button>
                            </div>
                        </div>



                    </div>

                </div >
            </div>
            {/* <Image /> */}
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

