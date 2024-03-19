import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Create from './Create'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Navbar from '../navbar'




const data = [
    {
        id: 1,
        client_name: "Jay Bhart1",
        client_ref: "SW_CL_001",
        mobile_no: 123456789,
        other_info: "XYZ"
    },
    {
        id: 2,
        client_name: "Jay Bhart2",
        client_ref: "SW_CL_002",
        mobile_no: 123456789,
        other_info: "XYZ"
    },
    {
        id: 3,
        client_name: "Jay Bhart3",
        client_ref: "SW_CL_003",
        mobile_no: 123456789,
        other_info: "XYZ"
    },
    {
        id: 4,
        client_name: "Jay Bhart4",
        client_ref: "SW_CL_004",
        mobile_no: 123456789,
        other_info: "XYZ"
    },
    {
        id: 5,
        client_name: "Jay Bhart5",
        client_ref: "SW_CL_005",
        mobile_no: 123456789,
        other_info: "XYZ"
    }
]

const Client_Management = () => {



    return (
        <div>
            <div className='flex'>

                <Navbar />
                <div className='ml-12 '>
                    <h1 className='font-medium text-[1.5rem] mt-16 font-inter '>Client Management</h1>
                    <p className='py-1 font-inter'>Manage, onbard and set activation status for the client</p>



                    <div className='mt-16 flex lg:mb-[10rem] '>
                        <div>
                            {/* Table */}
                            <Table>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead className=" xl:w-[20rem] lg:w-[20rem]  border-2 pl-5 text-[1rem] font-inter ">Client Name</TableHead>
                                        <TableHead className=" xl:w-[10rem] lg:w-[8rem]  border-2 pl-4 text-[1rem] font-inter ">Client Ref No</TableHead>
                                        <TableHead className=" xl:w-[18rem] lg:w-[20rem] border-2 pl-5 text-[1rem] font-inter ">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                {data.map((item) => (
                                    <TableBody key={item.id} className="border-2">
                                        <TableRow className="h-[3rem] ">
                                            <TableCell className="font-inter pl-4">{item.client_name}</TableCell>
                                            <TableCell className="border pl-4 font-inter  ">{item.client_ref}</TableCell>

                                            <TableCell className="flex ml-4 xl:w-[18rem] lg:w-[11rem]">

                                                <AlertDialog>
                                                    <AlertDialogTrigger className=''>
                                                        <Button className="  xl:w-[5rem] lg:w-[4em] h-[2rem] font-inter bg-gray-700 text-white rounded-lg ml-4"> Edit</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Edit the Client</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                <p className=' font-inter text-[1rem] text-black font-bold'>Client Name</p>
                                                                <Input value={item.client_name} />
                                                                <p className=' font-inter text-[1rem] text-black mt-3 font-bold'>Client Ref No</p>
                                                                <Input value={item.client_ref} />
                                                                <p className='  font-inter text-[1rem] text-black mt-3 font-bold'>Mobile Number</p>
                                                                <Input value={item.mobile_no} />
                                                                <p className=' font-inter text-[1rem] text-black mt-3 font-bold'>Other info</p>
                                                                <Input value={item.other_info} />

                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>


                                                <AlertDialog >
                                                    <AlertDialogTrigger className='' >
                                                        <Button className=" xl:w-[5rem] lg:w-[4rem]  h-[2rem] font-inter bg-red-700 text-white rounded-lg ml-4">Delete</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete content: Are you sure to deactivate client? Data related to client will persist but will not be able to use it henceforth.</AlertDialogTitle>
                                                            <AlertDialogDescription>

                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogAction className="bg-red-500">Delete</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))}


                            </Table>




                            {/* Paginations */}
                            <div className='mt-8'>

                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem className="border rounded-full">
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="border rounded-full">
                                            <PaginationLink href="#">2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="border rounded-full">
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="border rounded-full">
                                            <PaginationLink href="#">4</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="border rounded-full">
                                            <PaginationLink href="#">5</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="border rounded-full">
                                            <PaginationLink href="#">6</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>

                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>


                        </div>
                        <div>
                            <Create />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Client_Management

