import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"



const Client_Management = () => {

    const [clientData, setClientData] = useState([]);
    const naviagte = useNavigate();
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
                const token = Cookies.get('token');
                if (token !== token_1) {
                    naviagte("/");
                }
                console.log("Cokkies Token :", token);
                const response = await axios.get(
                    "https://jaybharat-api.vercel.app/jb/client/clients",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setClientData(response.data); // Assuming the response is an array of client data
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);


    return (
        <div>
            <div className='flex gap-10'>

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
                                {clientData.data && clientData.data.map((item) => (
                                    <TableBody key={item.id} className="border-2">
                                        <TableRow className="h-[3rem] ">
                                            <TableCell className="font-inter pl-4">{item.client_name}</TableCell>
                                            <TableCell className="border pl-4 font-inter  ">{item.client_ref_no}</TableCell>

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
                                                                <Input value={item.client_ref_no} />
                                                                <p className='  font-inter text-[1rem] text-black mt-3 font-bold'>Mobile Number</p>
                                                                <Input value={item.client_mobile_number} />
                                                                <p className=' font-inter text-[1rem] text-black mt-3 font-bold'>Other info</p>
                                                                <Input value={item.client_description_info} />

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

