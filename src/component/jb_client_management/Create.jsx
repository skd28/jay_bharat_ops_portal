import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Icons from "../Icons";

const Create = ({loading, submitFunc, showAlert}) => {
  const initialClientData = {
    client_name: "",
    client_ref_no: "",
    client_mobile_number: "",
    client_description_info: "",
  };
  const [clientData, setClientData] = useState(initialClientData);

  useEffect(()=>{
    if(showAlert){
        setClientData(initialClientData)
    }
  },[showAlert])

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
    // console.log(clientData);
  };  

  return (
    <div>
      <div className="border-2 mx-7 rounded xl:w-[30rem] lg:w-[22rem] ">
        <h1 className="my-3 mt-6 ml-6 font-inter">Onboard a new client</h1>
        <form>
          <p className="font-medium ml-6 font-inter">Client Name</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem] ml-6"
            name="client_name"
            value={clientData.client_name}
            onChange={handleChange}
          />
          <p className="font-medium ml-6 mt-3 font-inter">Client Ref No</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem] ml-6"
            name="client_ref_no"
            value={clientData.client_ref_no}
            onChange={handleChange}
          />
          <p className="font-medium ml-6 mt-3 font-inter">Mobile Number</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem] ml-6"
            name="client_mobile_number"
            value={clientData.client_mobile_number}
            onChange={handleChange}
          />
          <p className="font-medium ml-6 mt-3 font-inter">Other info</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem] ml-6"
            name="client_description_info"
            value={clientData.client_description_info}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="ml-6 bg-gray-800 text-white p-3 rounded-md my-4 font-inter flex items-center gap-x-2"
            onClick={(e)=>submitFunc(e, clientData)}
          >
            Save and onboard
            {loading && <Icons string="loading" width="25px" height="25px" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
