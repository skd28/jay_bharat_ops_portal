import React, { useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { SlMinus } from "react-icons/sl";


const Create_Sample = () => {




    const [fabricForms, setFabricForms] = useState([{ id: 1 }]);
    const [EmbroideryForm, setEmbroideryForm] = useState([{ id: 1 }]);
    const [ShifflyForm, setShifflyForm] = useState([{ id: 1 }]);
    const [ChemicalLancingForm, setChemicalLancingForm] = useState([{ id: 1 }]);
    const [HandEmbroideryForm, setHandEmbroideryForm] = useState([{ id: 1 }]);

    const addFabricForm = () => {
        const newId = fabricForms.length + 1;
        setFabricForms([...fabricForms, { id: newId }]);
    };

    const deleteFabricForm = (id) => {
        setFabricForms(fabricForms.filter(form => form.id !== id));
    };

    const addEmbroideryForm = () => {
        const newId = EmbroideryForm.length + 1;
        setEmbroideryForm([...EmbroideryForm, { id: newId }]);
    };

    const deleteEmbroideryForm = (id) => {
        setEmbroideryForm(EmbroideryForm.filter(form => form.id !== id));
    };
     
    const addShifflyForm = () => {
        const newId = ShifflyForm.length + 1;
        setShifflyForm([...ShifflyForm, { id: newId }]);
    };

    const deleteShifflyForm = (id) => {
        setShifflyForm(ShifflyForm.filter(form => form.id !== id));
    };

    const addHandEmbroideryForm = () => {
        const newId = HandEmbroideryForm.length + 1;
        setHandEmbroideryForm([...HandEmbroideryForm, { id: newId }]);
    };

    const deleteHandEmbroideryForm = (id) => {
        setHandEmbroideryForm(HandEmbroideryForm.filter(form => form.id !== id));
    };

    const addChemicalLancingForm = () => {
        const newId = ChemicalLancingForm.length + 1;
        setChemicalLancingForm([...ChemicalLancingForm, { id: newId }]);
    };

    const deleteChemicalLancingForm = (id) => {
        setChemicalLancingForm(ChemicalLancingForm.filter(form => form.id !== id));
    };

    return (
        <>
            <div className='mt-[4rem] ml-[3rem]   '>

                <div className='flex items-center'>
                    <Link to='/jb_admin/sample'  >  <FaAngleLeft className='text-[1rem] border-2  w-[2rem] h-[2rem] rounded-full' /></Link>
                    <p className=' font-bold text-[1.4rem] px-4'>Sampling </p>
                    <MdOutlineKeyboardArrowRight className=' text-[2.3rem]' />
                    <p className='font-bold text-[1.4rem] px-2'>Create Sample</p>
                </div>

                <div className='flex gap-5 mt-20 px-7'>
                    <div className='  border py-10 px-7 rounded-lg h-[60rem] '>
                        <p>Upload the sample image</p>
                        <img className='rounded-lg py-5  ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-4UrNveMngjY3HyNG5922XI7nzIudTijew&usqp=CAU' alt='...' />
                        <div className="border-2 border-black  rounded-lg border-dotted  h-[8rem] flex items-center justify-center">
                            Upload sample image
                        </div>
                        <div className='mt-5'>
                            <p className=''>Sample Number</p>
                            <Input className=" my-3 " placeholder=" Enter sample no" />
                            <p className=''>Client Code</p>
                            <Input className=" my-3 " placeholder="Eg:SW_CL_001" />
                            <p className=''>Start date of Sampling</p>
                            <Input className=" my-3 " placeholder="Eg:2024-12-23" />
                            <p className=''>End date of Sampling</p>
                            <Input className=" my-3 " placeholder="Eg:2023-12-23" />
                            <p className=''>Date of Dispatch</p>
                            <Input className=" my-3 " placeholder="Eg:2024-12-30" />
                        </div>

                    </div>
                    <div >
                        <div className='border-2   pt-16  xl:pl-14 lg:pl-8 rounded-lg py-8'>


                            <div className='flex items-center'>
                                <p className=' font-medium w-[7rem]  '>Cost of the Sample</p>
                                <Input className="xl:w-[15rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2  " placeholder="Enter in Rs." />
                            </div>




                            <h1 className='underline font-semibold text-[1.2rem] my-4 '>Fabrics</h1>
                            {fabricForms.map((form, index) => (
                                <div key={form.id} >
                                    <div className='flex items-center xl:gap-4 '>
                                        <div className='grid grid-cols-2 w-[40rem] gap-2'>
                                            <div className='flex items-center    gap-1'>
                                                <p className='font-medium lg:text-[0.8rem]  xl:text-[1rem] '>Select Fabric quality</p>
                                                <Input className="xl:w-[18rem] lg:w-[10rem] my-3" placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center '>
                                                <p className='font-medium  lg:text-[0.8rem]  xl:text-[1rem]  '>Cost of  Fabrics</p>
                                                <Input className=" xl:w-[18rem] lg:w-[10rem] my-3   " placeholder="Add value" />
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
                            <Button className="bg-black w-[15rem] mt-6" onClick={addFabricForm}>Add Fabric</Button>









                            {/* <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Embroidery</h1>
                            {EmbroideryForm.map((form, index) => (
                                <div key={form.id} >
                                    <div className='grid grid-cols-2  w-[53.5rem]'>
                                        <div className='flex items-center'>
                                            <p className='font-medium  w-[6rem] '>Embroidery No.</p>
                                            <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                        </div>
                                        <div className='flex items-center'>
                                            <p className='font-medium w-[6rem]'>Cost of Embroidery</p>
                                            <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" />
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='grid grid-cols-2  w-[53.5rem]'>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>Start Date</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>End Date</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" />
                                            </div>
                                        </div>
                                        {form.id !== 1 && (
                                            <SlMinus onClick={() => deleteEmbroideryForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                        )}

                                    </div>
                                </div>
                            ))}
                            <Button className="bg-black w-[15rem] mt-6" onClick={addEmbroideryForm}>Add Embroidery</Button>

                         




                            <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Shiffly</h1>
                            {ShifflyForm.map((form, index) => (
                                <div key={form.id} >
                                    <div className='flex items-center'>
                                        <div className='grid grid-cols-2  w-[53rem]'>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[8rem] '>Shiffly number</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center '>
                                                <p className='font-medium  w-[8rem]   '>Cost of Shiffly</p>
                                                <Input className=" xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                            </div>
                                        </div>
                                        {form.id !== 1 && (
                                            <SlMinus onClick={() => deleteShifflyForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                        )}

                                    </div>
                                </div>
                            ))}
                            <Button className="bg-black w-[15rem] mt-6" onClick={addShifflyForm}>Add Shiffly</Button>
                        




                            <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Hand Embroidery</h1>
                            {HandEmbroideryForm.map((form, index) => (
                                <div key={form.id} >
                                    <div className='grid grid-cols-2  w-[53.5rem]'>
                                        <div className='flex items-center'>
                                            <p className='font-medium  w-[6rem] '>Embroidery No.</p>
                                            <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                        </div>
                                        <div className='flex items-center'>
                                            <p className='font-medium w-[6rem]'>Cost of Embroidery</p>
                                            <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" />
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='grid grid-cols-2  w-[53.5rem]'>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>Start Date</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[6rem]'>End Date</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" />
                                            </div>
                                        </div>
                                        {form.id !== 1 && (
                                            <SlMinus onClick={() => deleteHandEmbroideryForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                        )}

                                    </div>
                                </div>
                            ))}
                            <Button className="bg-black w-[15rem] mt-6" onClick={addHandEmbroideryForm}>Add Hand Embroidery</Button>



                            <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Chemical Lacing</h1>

                            {ChemicalLancingForm.map((form, index) => (
                                <div key={form.id} >
                                    <div className='flex items-center'>
                                        <div className='grid grid-cols-2  w-[53rem]'>
                                            <div className='flex items-center'>
                                                <p className='font-medium w-[8rem] '>Lacing number</p>
                                                <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                            </div>
                                            <div className='flex items-center '>
                                                <p className='font-medium  w-[8rem]   '>Cost of Lacing</p>
                                                <Input className=" xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                            </div>
                                        </div>
                                        {form.id !== 1 && (
                                            <SlMinus onClick={() => deleteChemicalLancingForm(form.id)} className=" text-[1.3rem] mr-4 " />
                                        )}

                                    </div>
                                </div>
                            ))}
                            <Button className="bg-black w-[15rem] mt-6" onClick={addChemicalLancingForm}>Add Chemical Lacing</Button>
                           




                            <h1 className='underline font-semibold text-[1.2rem] my-4 mt-20 '>Stiching</h1>
                            <div className='grid grid-cols-2'>
                                <div className='flex items-center'>
                                    <p className='font-medium   w-[7rem] '>Enter Stiching count</p>
                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2" placeholder="Add value" />
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-medium   w-[7rem] '>Cost of Stiching</p>
                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                </div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div className='flex items-center'>
                                    <p className='font-medium   w-[7rem] '>Start Date</p>
                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-medium   w-[7rem] '>End Date</p>
                                    <Input className="xl:w-[18rem] lg:w-[14rem] my-3 xl:mx-7 lg:mx-2 " placeholder="Add value" />
                                </div>
                            </div> */}
                        </div>

                        <div className='text-right my-3 mb-7'>
                            <Button className="bg-black  w-[17rem]">Finalize and Summit</Button>
                        </div>
                    </div>



                </div>

            </div >
        </>
    )
}

export default Create_Sample
