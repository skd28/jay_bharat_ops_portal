import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./sample.css";

const Sample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  useEffect(() => {
    const fetchClients = () => {
      const token = Cookies.get("token");
      // console.log("Cokiess for Client  :",token);
      if (!token) {
        naviagte("/");
      }
      setLoading(true);
      axios
        .get("https://jaybharat-api.vercel.app/jb/sampling/samples", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log("Response Data :", response.data);
          setData(response.data); // Assuming the response is an array of client data
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching clients:", error);
        });
    };

    fetchClients();
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
          {data.length === 0 ? (
            loading ? (
              <div className="mt-[3rem] rounded-md  grid grid-cols-3 my-5 gap-5 ">
                {[1, 2, 3, 4, 5, 6].map((v) => (
                  <div
                    key={v}
                    className="w-[289px] flex flex-col items-center h-[327px] py-4 border-4"
                  >
                    <div className="w-[10rem] h-[10rem] mx-auto overflow-hidden skeleton-box"></div>
                    <div className="w-[80%] h-5 mx-auto  my-[0.7rem] mt-6 skeleton-box"></div>
                    <div className=" h-10 mx-[1rem] my-4 w-[80%]  skeleton-box"></div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-2xl text-center w-full">No Data Found</h1>
            )
          ) : (
            <>
              <div className="mt-[5.5rem] flex">
                <Input
                  className="w-[20rem] "
                  placeholder="Filter by sample name"
                />
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
              </div>
              <div className="mt-[3rem] rounded-md  grid grid-cols-3 my-5 gap-5 ">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className=" border-4  text-center items-center justify-center py-4 shadow-xl "
                  >
                    <div className="w-[10rem] h-[10rem] mx-auto overflow-hidden">
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
                    <Button className="bg-gray-800  mx-[1rem] my-4 w-[80%] ">
                      <a href={`/jb_admin/sample/sampling?id=${item.id}`}>
                        {" "}
                        Manage
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sample;
