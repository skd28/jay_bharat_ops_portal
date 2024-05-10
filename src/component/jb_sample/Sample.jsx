import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sample = () => {
  const [data, setData] = useState([]);
  const naviagte = useNavigate();

  const [paginationRef, setPaginationRef] = useState(1);

  const paginationNext = () => {
    setPaginationRef((prev) => prev + 5);
  };

  const paginationPrev = () => {
    if (paginationRef !== 1) {
      setPaginationRef((prev) => prev - 5);
    }
  };


  const fetchSample = async (page) => {
    try {
      // const token_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.NgpdZuV95m4yxIpuPMq6x0TYw72Hi_7fqm9Zj9jBja8';
      const token = Cookies.get("token");
      // console.log("Cokiess for Client  :",token);
      if (!token) {
        naviagte("/");
      }

      let url = null;

      if (page === null) {
        url = "https://jaybharat-api.vercel.app/jb/sampling/samples";
      } else {
        url =
          "https://jaybharat-api.vercel.app/jb/sampling/samples?page=" + page;
      }
      //  console.log("Cokkies Token :", token);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response Data :", response.data);
      setData(response.data); // Assuming the response is an array of client data
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  
  useEffect(() => {
    fetchSample();
  }, []);

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="  mt-[4.5rem] ml-[5rem]  ">
          <div className=" flex  justify-between  ">
            <div>
              <h1 className="text-[2rem] font-inter font-semibold">
                Stage 0: Sample
              </h1>
              <p>Create, manage and remove sampling and track the process.</p>
            </div>
            <Button className="rounded-full font-inter text-[1rem] bg-gray-700 h-12  ">
              <Link to="/jb_admin/sample/sampling">+ Sample</Link>
            </Button>
          </div>

          {/*  <div className="mt-[5.5rem] flex ">
            <Input className="w-[20rem] " placeholder="Filter by sample name" />
            <Input
              className="w-[10rem] mx-4 "
              placeholder="Filter by sample ID"
            />
            <Button className="   border text-white">Quality</Button>
            <Button className=" text-white  border mx-4">Process</Button>
            <Button className="bg-gray-800">
              <CiFilter className="text-[1.4rem]" />
              Filter the records
            </Button>
          </div>  my-5 */}

          <div className="mt-[3rem] rounded-md  grid grid-cols-3 gap-5   ">
            {data.map((item, indx) => (
              <div
                key={item.id}
                className=" border-4  text-center items-center justify-center p-[2rem] shadow-xl "
              >
                {/* <div className='  mx-auto border-4  border-red-500'>
              <img src={item.sampling_image} className=' bg-contain w-[10rem] ' alt='...'/>
                </div>   w-[10rem] h-[10rem] py-4 */}
                <div className="w-[13rem] h-[13rem] mx-auto overflow-hidden">
                  <img
                    src={item.sampling_image}
                    alt="Your Image"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* <h2 className=' px-[2rem]  font-semibold text-[1.2rem] mt-[0.5rem] '>Bharat Embroidery</h2> */}
                <p className=" px-[2rem]  text-center my-[0.7rem] mt-6 ">
                  {item.sampling_number}
                </p>
                <Button className="bg-gray-800  mx-[1rem]  w-[80%] ">
                  <a href={`/jb_admin/sample/sampling?id=${item.id}`}>
                    {" "}
                    Manage
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className=" flex gap-3 my-8">
            <button onClick={() => paginationPrev()}>PREV</button>
            <button onClick={() => fetchSample(null)}>{paginationRef}</button>
            <button onClick={() => fetchSample(paginationRef + 1)}>
              {paginationRef + 1}
            </button>
            <button onClick={() => fetchSample(paginationRef + 2)}>
              {paginationRef + 2}
            </button>
            <button onClick={() => fetchSample(paginationRef + 3)}>
              {paginationRef + 3}
            </button>
            <button onClick={() => fetchSample(paginationRef + 4)}>
              {paginationRef + 4}
            </button>
            <button onClick={() => paginationNext()}>NEXT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sample;
