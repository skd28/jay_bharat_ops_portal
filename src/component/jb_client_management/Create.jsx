import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Icons from "../Icons";

const Create = ({
  component,
  loading,
  submitFunc,
  showAlert,
  data = undefined,
  cancel = undefined
}) => {
  const initialClientData = {
    client_name: data?.client_name || "",
    client_ref_no: data?.client_ref_no || "",
    client_mobile_number: data?.client_mobile_number || "",
    client_description_info: data?.client_description_info || "",
  };
  const [clientData, setClientData] = useState(initialClientData);

  useEffect(() => {
    if (showAlert) {
      setClientData(initialClientData);
    }
  }, [showAlert]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
    // console.log(clientData);
  };

  return (
    <div>
      <div className={`border-2 rounded p-5 flex flex-col gap-y-3 ${!!component ? '' :'xl:w-[30rem] lg:w-[22rem]'} `}>
        <h1 className="font-inter text-xl font-bold underline underline-offset-2 decoration-double">
          {component === "Edit" ? "Edit the Client" : "Onboard a new client"}
        </h1>
        <form>
          <p className="font-medium font-inter">Client Name</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem]"
            name="client_name"
            value={clientData.client_name}
            onChange={handleChange}
          />
          <p className="font-medium mt-3 font-inter">Client Ref No</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem]"
            name="client_ref_no"
            value={clientData.client_ref_no}
            onChange={handleChange}
          />
          <p className="font-medium mt-3 font-inter">Mobile Number</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem]"
            name="client_mobile_number"
            value={clientData.client_mobile_number}
            onChange={handleChange}
          />
          <p className="font-medium mt-3 font-inter">Other info</p>
          <Input
            className="xl:w-[25rem] lg:w-[19rem]"
            name="client_description_info"
            value={clientData.client_description_info}
            onChange={handleChange}
          />
          {!!component ? (
            <div className="flex gap-x-5 justify-end my-4">
              <button className="py-2 px-4 text-white bg-red-700" onClick={() => cancel(false)}>Cancel</button>
              <button className="py-2 px-4 text-white bg-black" onClick={(e) => submitFunc(e, clientData)}>Edit New Value</button>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-gray-800 text-white p-3 rounded-md my-4 font-inter flex items-center gap-x-2"
              onClick={(e) => submitFunc(e, clientData)}
            >
              Save and onboard
              {loading && <Icons string="loading" width="25px" height="25px" />}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Create;
