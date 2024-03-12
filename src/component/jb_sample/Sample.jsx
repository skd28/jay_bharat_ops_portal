import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CiFilter } from "react-icons/ci";
import { Link } from 'react-router-dom';




const Sample = () => {
  return (
    <div className='  mt-[4.5rem] ml-[5rem]  '>

      <div className=' flex  justify-between mr-5 '>
        <div>
          <h1 className='text-[2rem] font-inter font-semibold'>
            Stage 0: Sample
          </h1>
          <p>Create, manage and remove sampling and track the process.</p>
        </div>
        <Button className="rounded-full font-inter text-[1rem] bg-gray-700 h-12 mr-[4rem] ">
        <Link to='/jb_admin/sample/sampling'>+ Sample</Link>
        </Button>
       
      </div>

      <div className='mt-[5.5rem] flex mr-10'>
        <Input className="w-[25rem] " placeholder="Filter by sample name" />
        <Input className="w-[15rem] mx-4 " placeholder="Filter by sample ID" />
        <Button className=" text-gray-600  border">Quality</Button>
        <Button className=" text-gray-600  border mx-4">Process</Button>
        <Button className="bg-gray-800">
          <CiFilter className='text-[1.4rem]' />
          Filter the records
        </Button>
      </div>

      <div className='mt-[3rem] border-2 w-[18rem] rounded-md h-[22rem] '>
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3MlyrYynFO-urpfPIya2u4Wq7-pg_7wRuaw&usqp=CAU" className='mt-[2rem] px-[2rem] w-[18rem] h-[10rem] rounded-md' alt='...'/>
          <h2 className=' px-[2rem]  font-semibold text-[1.2rem] mt-[0.5rem] '>Bharat Embroidery</h2>
          <p className=' px-[2rem]  text-center my-[0.7rem]'>REF_001</p>
          <Button className="bg-gray-800 w-[15rem] mx-[1.6rem]  ">Manage</Button>
      </div>
    </div>
  )
}

export default Sample
