

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axios from 'axios';
// import Navbar from '../navbar';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"




const Create = () => {


    const initialClientData = {
        client_name: '',
        client_ref_no: '',
        client_mobile_number: '',
        client_description_info: ''
    };
    const [clientData, setClientData] = useState(initialClientData);
    const [showAlert, setShowAlert] = useState(false);
    const naviagte = useNavigate();

    const handleChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value })
        // console.log(clientData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          // const token_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
          const token = Cookies.get('token');
          if(!token)
          {
            naviagte("/");
          }
            const response = await axios.post(
                "https://jaybharat-api.vercel.app/jb/client/create_client",
                clientData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // console.log(response.data);
            setShowAlert(true);
        } catch (error) {
            console.log("Error Signing up");
        }
    };

    return (
        <div >

            <div className='border-2 mx-7 rounded xl:w-[30rem] lg:w-[22rem] '>
                <h1 className='my-3 mt-6 ml-6 font-inter'>Onboard a new client</h1>
                {showAlert && (
                    <Alert className=" w-[27rem] mx-auto">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            Client data saved and onboarded successfully!
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <p className='font-medium ml-6 font-inter'>Client Name</p>
                    <Input
                        className="xl:w-[25rem] lg:w-[19rem] ml-6"
                        name="client_name"
                        value={clientData.client_name}
                        onChange={handleChange}
                    />
                    <p className='font-medium ml-6 mt-3 font-inter'>Client Ref No</p>
                    <Input
                        className="xl:w-[25rem] lg:w-[19rem] ml-6"
                        name="client_ref_no"
                        value={clientData.client_ref_no}
                        onChange={handleChange}
                    />
                    <p className='font-medium ml-6 mt-3 font-inter'>Mobile Number</p>
                    <Input
                        className="xl:w-[25rem] lg:w-[19rem] ml-6"
                        name="client_mobile_number"
                        value={clientData.client_mobile_number}
                        onChange={handleChange}
                    />
                    <p className='font-medium ml-6 mt-3 font-inter'>Other info</p>
                    <Input
                        className="xl:w-[25rem] lg:w-[19rem] ml-6"
                        name="client_description_info"
                        value={clientData.client_description_info}
                        onChange={handleChange}
                    />

                    <button type="submit" className='ml-6 bg-gray-800 text-white p-3 rounded-md my-4 font-inter'>Save and onboard</button>
                </form>
            </div>

        </div>
    );
};

export default Create;

