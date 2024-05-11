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

  const [paginationRef, setPaginationRef] = useState([]);
  const [paginationRefClone, setPaginationRefClone] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startRange, setStartRange] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);

  const [loading, setLoading] = useState(false);

  const paginationNext = () => {
    if (currentPage !== paginationRef[paginationRef.length - 1]) {
      setData([]);
      setCurrentPage((prev) => prev + 1);
      fetchSample(currentPage + 1);
      if (
        paginationRef.length > 3 &&
        currentPage === paginationRefClone[paginationRefClone.length - 1] &&
        !paginationRefClone.includes(paginationRef[paginationRef.length - 1])
      ) {
        let pages = paginationRef.slice(0);
        setStartRange((prev) => prev + 1);
        setPaginationRefClone(pages.slice(startRange, startRange + 3));
      }
    }
  };

  const paginationPrev = () => {
    if (currentPage !== 1) {
      setData([]);
      setCurrentPage((prev) => prev - 1);
      fetchSample(currentPage - 1);
      if (
        paginationRef.length > 3 &&
        currentPage === paginationRefClone[0] &&
        paginationRefClone[0] !== 1
      ) {
        let pages = paginationRef.slice(0);
        setStartRange((prev) => prev - 1);
        setPaginationRefClone(pages.slice(startRange - 2, startRange + 1));
      }
    }
  };

  const fetchSample = (page = undefined) => {
    const token = Cookies.get("token");
    // console.log("Cokiess for Client  :",token);
    if (!token) {
      naviagte("/");
    }

    setLoading(true);
    axios
      .get(
        `https://jaybharat-api.vercel.app/jb/sampling/samples?page=${
          page || "1"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        let { count } = response.data;
        let modulo = Number.isInteger(count / dataPerPage)
          ? count / dataPerPage
          : parseInt(count / dataPerPage) + 1;
        setPaginationRef(Array.from({ length: modulo }, (_, i) => i + 1));
        if (page === undefined && modulo > 1) {
          let pages = Array.from({ length: modulo }, (_, i) => i + 1);
          if (pages.length > 3) {
            setPaginationRefClone(pages.slice(0, 3));
          } else {
            setPaginationRefClone(pages);
          }
        }

        setLoading(false);
        console.log("Response Data :", response.data.results);
        setData(response.data.results); // Assuming the response is an array of client data
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching clients:", error);
      });
  };

  useEffect(() => {
    fetchSample();
  }, []);

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className=" mt-[4.5rem] ml-[5rem] flex flex-col items-center ">
          <div className="w-full flex  justify-between  ">
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
              <div className="mt-[3rem] rounded-md  grid grid-cols-3 my-5 gap-5 ">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="w-72 border-4  text-center items-center justify-center py-4 shadow-xl "
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
              {paginationRefClone.length ? (
                <div className="mt-6 flex gap-3 mx-auto justify-center w-full">
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      currentPage !== 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-300 text-white"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => paginationPrev()}
                  >
                    PREV
                  </button>
                  {paginationRefClone.map((page) => (
                    <div
                      key={page}
                      className={
                        currentPage === page
                          ? "rounded-xl p-[1px] border-[3px] border-blue-500"
                          : "rounded-xl p-[1px] border-[3px] border-[transparent]"
                      }
                    >
                      <button
                        className={`py-2 px-4 rounded-lg bg-gray-900 text-white`}
                        onClick={() => {
                          setData([]);
                          setCurrentPage(page);
                          fetchSample(page);
                        }}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      currentPage !== paginationRef[paginationRef.length - 1]
                        ? "bg-gray-900 text-white"
                        : "bg-gray-300 text-white"
                    }`}
                    disabled={
                      currentPage === paginationRef[paginationRef.length - 1]
                    }
                    onClick={() => paginationNext()}
                  >
                    NEXT
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sample;
